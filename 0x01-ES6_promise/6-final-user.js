import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

async function handleProfileSignup(firstName, lastName, fileName) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  const results = await Promise.allSettled([userPromise, photoPromise]);

  const response = results.map((result) => ({
    status: result.status,
    value: result.status === 'fulfilled' ? result.value : result.reason.message,
  }));

  return response;
}

export default handleProfileSignup;
