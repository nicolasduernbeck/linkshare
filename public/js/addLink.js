/*eslint-disable*/

const submitBtn = document.querySelector('.submit__btn');
const title = document.querySelector('.input__title');
const link = document.querySelector('.input__link');

const loginUser = async data => {
  try {
    const res = await fetch('api/v1/links', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(res.message);
    window.location.reload(true);
  } catch (err) {
    console.log(err);
  }
};

submitBtn.addEventListener('click', () => {
  loginUser({
    title: title.value,
    link: link.value
  });
});
