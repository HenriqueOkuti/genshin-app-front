import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  EmailField,
  ImageColumn,
  ImageUpdateField,
  InputColumn,
  NameField,
  ProfileFormsData,
  UpdateDataButton,
} from './ProfileStyles';

export function ProfileMain({ userData, updatedData, setUpdatedData }) {
  //console.log(userData);
  const [newUserData, setNewUserData] = useState({ ...userData });
  const [validImage, setValidImage] = useState('original');
  const [imageURL, setImageURL] = useState('');
  const [validData, setValidData] = useState(false);
  //
  useEffect(async () => {
    if (imageURL !== userData.image && imageURL) {
      const imageIsValid = await verifyURL(imageURL);
      if (imageIsValid) {
        setValidImage('valid');
        setNewUserData({ ...newUserData, image: imageURL });
      } else {
        setValidImage('invalid');
        setNewUserData({ ...newUserData, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
      }
    } else {
      setValidImage('original');
    }
  }, [imageURL]);

  useEffect(() => {
    setNewUserData({ ...userData });
  }, [userData]);

  useEffect(() => {
    if (imageURL.length === 0) {
      setNewUserData({ ...newUserData, image: userData.image });
    }
  }, [imageURL]);

  useEffect(() => {
    setValidData(verifyData(newUserData, userData, validImage));
  }, [userData, newUserData, validImage]);

  const borderDetails = {
    original: 'none',
    valid: '5px solid green',
    invalid: '5px solid red',
  };

  console.log(window.innerWidth);

  return (
    <>
      <div>
        <ProfileFormsData>
          <ImageColumn border={borderDetails[validImage]}>
            <div>
              <img src={newUserData.image} alt={`${newUserData.name}`} />
            </div>
          </ImageColumn>
          <InputColumn>
            <NameField>Name:</NameField>
            <TextField
              onChange={(e) => setNewUserData({ ...userData, name: e.target.value })}
              fullWidth
              key={newUserData.name}
              defaultValue={newUserData.name}
              disabled={false}
              id="outlined-required"
            />
            <EmailField>Email:</EmailField>
            <TextField
              fullWidth
              disabled={true}
              key={newUserData.email}
              defaultValue={newUserData.email}
              id="outlined-required"
            />
          </InputColumn>
        </ProfileFormsData>
        <ImageUpdateField>
          <div>Avatar:</div>
          <div>
            <TextField
              onChange={(e) => setImageURL(e.target.value)}
              fullWidth
              disabled={false}
              key={userData.image}
              defaultValue={userData.image}
              id="outlined-required"
            />
          </div>
        </ImageUpdateField>
        <ButtonContainer>
          <UpdateDataButton color={validData}>Update</UpdateDataButton>
        </ButtonContainer>
      </div>
    </>
  );
}

export function ProfileMobile({ userData, updatedData, setUpdatedData }) {
  console.log(userData);

  return (
    <>
      <div>Forms</div>
    </>
  );
}

async function verifyURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

function verifyData(newData, oldData, validImage) {
  if (validImage === 'invalid') {
    return false;
  }
  if (newData.name.length === 0) {
    return false;
  }
  if (newData.image.length === 0) {
    return false;
  }
  if (newData.email.length === 0) {
    return false;
  }
  if (newData.email === oldData.email && newData.image === oldData.image && newData.name === oldData.name) {
    return false;
  }

  return true;
}
