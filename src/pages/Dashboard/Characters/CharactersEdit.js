import { useEffect, useState } from 'react';
import { allTalents } from '../../../utils/abilitiesImageImporter';
import { HandleRedirectButton } from './CharactersRedirect';
import {
  AddCharacterContainer,
  AddCharacterImage,
  AuxContainer,
  CharactersHeader,
  CharactersHeaderButtons,
  EditButtonsContainer,
  EditCharacterContainer,
  EditCharacterImage,
  EditCharacterOuterContainer,
  EditDeleteButton,
  EditForms,
  EditModifyButton,
  IndividualTalent,
  MiscInputContainer,
  PromptContainer,
  RenderAddCharacterContainer,
  TalentInfo,
  TalentsContainer,
  TalentsTitle,
} from './CharactersStyles';

//main version
export function CharEditMain({ characterToEdit, setCharacterToEdit, setPageState, elements }) {
  const [enabled, setEnabled] = useState(false);
  const [userCharData, setUserCharData] = useState({
    userCharacterId: characterToEdit.id,
    characterId: characterToEdit.characterId,
    level: characterToEdit.level,
    friendship: characterToEdit.talents[0].value,
    talents: {
      normal: characterToEdit.talents[0].value,
      skill: characterToEdit.talents[1].value,
      burst: characterToEdit.talents[2].value,
    },
    constellations: characterToEdit.constellations.length,
  });

  const allTalentsImage = allTalents.imageTalents;
  const elementColors = {
    anemo: '#6ec5b1',
    cryo: '#9fd7e4',
    dendro: '#a6c938',
    electro: '#a98bc6',
    geo: '#f9b62d',
    hydro: '#4cc3f6',
    pyro: '#ec7e24',
  };

  useEffect(() => {
    setEnabled(verifyData(userCharData));
  }, [userCharData]);

  const colorsDict = {};
  for (let i = 0; i < elements.length; i++) {
    colorsDict[elements[i].id] = elementColors[elements[i].name];
  }

  const characterKey = characterToEdit.name.toLowerCase().replace(' ', '_').replace('(', '').replace(')', '');
  const charTalentsImages = allTalentsImage[characterKey];

  return (
    <>
      <AuxContainer>
        <CharactersHeader>
          <div>Editing {characterToEdit.name}</div>
          <CharactersHeaderButtons>
            <div>
              <HandleRedirectButton
                pageState={'edit'}
                setPageState={setPageState}
                setCharacterToMod={setCharacterToEdit}
              />
            </div>
          </CharactersHeaderButtons>
        </CharactersHeader>
        <EditCharacterOuterContainer>
          <EditCharacterContainer>
            <EditCharacterImage color={colorsDict[characterToEdit.elementId]}>
              <img src={characterToEdit.imageSplashArt} alt={`${characterToEdit.name}`} />
            </EditCharacterImage>
            <EditForms>
              <TalentsContainer>
                <TalentsTitle>Talents:</TalentsTitle>
                <IndividualTalent>
                  <TalentInfo color={colorsDict[characterToEdit.elementId]}>
                    <img src={charTalentsImages.talents.normal} alt={'Normal attack'} />
                    <div>Normal</div>
                    <div>
                      <input
                        onChange={(e) => {
                          setUserCharData({
                            ...userCharData,
                            talents: {
                              ...userCharData.talents,
                              normal: +e.target.value,
                            },
                          });
                        }}
                        defaultValue={userCharData.talents.normal}
                        type="number"
                        min="1"
                        max="10"
                      />
                    </div>
                  </TalentInfo>
                </IndividualTalent>
                <IndividualTalent>
                  <TalentInfo color={colorsDict[characterToEdit.elementId]}>
                    <img src={charTalentsImages.talents.skill} alt={'Normal attack'} />
                    <div>Skill</div>
                    <div>
                      <input
                        onChange={(e) => {
                          setUserCharData({
                            ...userCharData,
                            talents: {
                              ...userCharData.talents,
                              skill: +e.target.value,
                            },
                          });
                        }}
                        defaultValue={userCharData.talents.skill}
                        type="number"
                        min="1"
                        max="10"
                      />
                    </div>
                  </TalentInfo>
                </IndividualTalent>
                <IndividualTalent>
                  <TalentInfo color={colorsDict[characterToEdit.elementId]}>
                    <img src={charTalentsImages.talents.burst} alt={'Normal attack'} />
                    <div>Burst</div>
                    <div>
                      <input
                        onChange={(e) => {
                          setUserCharData({
                            ...userCharData,
                            talents: {
                              ...userCharData.talents,
                              burst: +e.target.value,
                            },
                          });
                        }}
                        defaultValue={userCharData.talents.burst}
                        type="number"
                        min="1"
                        max="10"
                      />
                    </div>
                  </TalentInfo>
                </IndividualTalent>
              </TalentsContainer>
              <MiscInputContainer>
                <div>Level:</div>
                <div>
                  <input
                    onChange={(e) => {
                      setUserCharData({
                        ...userCharData,
                        level: +e.target.value,
                      });
                    }}
                    defaultValue={userCharData.level}
                    type="number"
                    min="1"
                    max="90"
                  />
                </div>
              </MiscInputContainer>
              <MiscInputContainer>
                <div>Friendship:</div>
                <div>
                  <input
                    onChange={(e) => {
                      setUserCharData({
                        ...userCharData,
                        friendship: +e.target.value,
                      });
                    }}
                    defaultValue={userCharData.friendship}
                    type="number"
                    min="1"
                    max="10"
                  />
                </div>
              </MiscInputContainer>
              <MiscInputContainer>
                <div>constellations:</div>
                <div>
                  <input
                    onChange={(e) => {
                      setUserCharData({
                        ...userCharData,
                        constellations: +e.target.value,
                      });
                    }}
                    defaultValue={userCharData.constellations}
                    type="number"
                    min="0"
                    max="6"
                  />
                </div>
              </MiscInputContainer>
            </EditForms>
          </EditCharacterContainer>
        </EditCharacterOuterContainer>
        <EditButtonsContainer>
          <EditDeleteButton
            onClick={() => {
              if (enabled) {
                console.log('confirmation modal');
              }
            }}
          >
            Delete
          </EditDeleteButton>
          <EditModifyButton
            color={enabled}
            onClick={() => {
              if (enabled) {
                console.log('modify');
              }
              //setCharacterToEdit(null);
              //setPageState('initial');
            }}
          >
            Modify
          </EditModifyButton>
        </EditButtonsContainer>
      </AuxContainer>
    </>
  );
}

//mobile version
export function CharEditMobile() {
  return (
    <>
      <div>Edit mobile</div>
    </>
  );
}

function verifyData(userCharData) {
  if (!userCharData.userCharacterId || userCharData.userCharacterId <= 0) {
    return false;
  }

  if (!userCharData.characterId || userCharData.characterId <= 0) {
    return false;
  }

  if (!userCharData.level || userCharData.level <= 0 || userCharData.level > 90) {
    return false;
  }

  if (!userCharData.friendship || userCharData.friendship <= 0 || userCharData.friendship > 10) {
    return false;
  }

  if (!userCharData.talents) {
    return false;
  }

  if (!userCharData.talents.normal || userCharData.talents.normal <= 0 || userCharData.talents.normal > 10) {
    return false;
  }

  if (!userCharData.talents.skill || userCharData.talents.skill <= 0 || userCharData.talents.skill > 10) {
    return false;
  }

  if (userCharData.constellations < 0 || userCharData.constellations > 6) {
    return false;
  }

  return true;
}