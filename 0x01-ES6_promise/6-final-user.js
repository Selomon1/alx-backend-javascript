import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const promises = [];

  const userPromise = signUpUser(firstName, lastName)
    .then((result) => ({ status: 'fulfilled', value: result }))
    .catch((error) => ({ status: 'rejected', value: error }));

  promises.push(userPromise);

  const photoPromise = uploadPhoto(fileName)
    .then((result) => ({ status: 'fulfilled', value: result }))
    .catch((error) => ({ status: 'rejected', value: error }));

  promises.push(photoPromise);

  return Promise.all(promises);
}
