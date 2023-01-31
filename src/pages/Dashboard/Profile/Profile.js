import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getUser } from '../../../services/services';
import { ProfileMain } from './ProfileForms';
import { AuxContainer, ProfileFormsContainer, ProfileHeaders } from './ProfileStyles';

export function ProfileManager() {
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [updatedData, setUpdatedData] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    name: 'Username',
    email: 'default@mail.com',
    image: 'https://d16u9y6cg00afk.cloudfront.net/Genshin_Impact_Official_Chibi/966410.512.webp',
  });

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(async () => {
    if (token) {
      const response = await getUser(token);
      if (response.id) {
        setUserData(response);
      }
    }
  }, [token]);

  if (window.innerWidth > 700) {
    //Render main version
    if (userData?.name) {
      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello, {userData.name}</div>
          </ProfileHeaders>
          <ProfileFormsContainer>
            <ProfileMain userData={userData} updatedData={updatedData} setUpdatedData={setUpdatedData} />
          </ProfileFormsContainer>
          <div>
            <div>Update data</div>
          </div>
        </AuxContainer>
      );
    } else {
      //setFetch(true);

      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello...</div>
          </ProfileHeaders>
          <div>Loading data...</div>
        </AuxContainer>
      );
    }
  } else {
    //Render mobile version
    return (
      <>
        <div>Mobile page</div>
      </>
    );
  }
}
