/*eslint-disable*/

const submitBtn = document.querySelector('.submit__btn');
const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.password__confirm');

const registerUser = async data => {
  try {
    const res = await fetch('api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }
};

submitBtn.addEventListener('click', () => {
  registerUser({
    name: name.value,
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value
  });
});
