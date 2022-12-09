/*eslint-disable*/

const submitBtn = document.querySelector('.submit__btn');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

const loginUser = async data => {
  try {
    const res = await fetch('api/v1/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    window.location = `/${json.data.slug}`;
  } catch (err) {
    console.log(err);
  }
};

submitBtn.addEventListener('click', () => {
  loginUser({
    email: email.value,
    password: password.value
  });
});
