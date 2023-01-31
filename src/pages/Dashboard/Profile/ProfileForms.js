import { useEffect } from 'react';

export function ProfileMain({ userData, updatedData, setUpdatedData }) {
  console.log(userData);

  useEffect(async () => {
    console.log(await verifyURL(userData.image));
  }, []);

  return (
    <>
      <div>
        <div>
          <div>Image</div>
          <div>name</div>
          <div>email</div>
        </div>
        <div>image update</div>
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
    img.oneerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}
