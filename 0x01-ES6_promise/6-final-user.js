import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const promises = [signUpUser(firstName, lastName), uploadPhoto(fileName)];
  const response = [];

  return Promise.allSettled(promises)
    .then((responses) => {
      responses.forEach(({ status, value, reason }) => {
        response.push({
          status,
          value: status === 'rejected' ? reason.toString() : value,
        });
      });
      return response;
    });
}
