
const index = (req, res) => {
  res.json({
    title: 'Home page',
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe labore reprehenderit commodi? Nemo eum, aperiam, deserunt fuga doloribus atque neque iste fugiat, eos quod totam ea accusamus quidem earum doloremque?',
  });
};

module.exports = {
  index,
};
