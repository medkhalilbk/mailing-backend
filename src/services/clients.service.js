 
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateNumber = (number) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(number);
};
 

module.exports = {validateEmail,validateNumber}