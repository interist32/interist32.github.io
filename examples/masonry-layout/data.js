function getData(amount = 10) {
  const data = [
    {image: 'images/01.jpg', height: 295},
    {image: 'images/02.jpg', height: 419},
    {image: 'images/03.jpg', height: 354},
    {image: 'images/04.jpg', height: 312},
    {image: 'images/05.jpg', height: 237},
    {image: 'images/06.jpg', height: 177},
    {image: 'images/07.jpg', height: 419},
    {image: 'images/08.jpg', height: 354},
    {image: 'images/09.jpg', height: 147},
    {image: 'images/10.jpg', height: 236},
  ];

  return Array.from({length: amount}, (_, i) => data[i % data.length]);
}