const base = 'https://opzoeken-postcode.be/xxxx.json';
const result = [];
let i = 1000;
const interval = setInterval(() => {
  fetch(base.replace('xxxx', i))
  .then(res => res.json())
  .then(json => {
    if(json.length) {
      let res = json.filter((obj) => {
        return (obj.Postcode.postcode_deelgemeente == json[0].Postcode.postcode_deelgemeente)
            && (obj.Postcode.naam_deelgemeente    !== json[0].Postcode.naam_deelgemeente || obj == json[0]);
      });
      res.forEach((el) => {
        result.push({
          name: el.Postcode.naam_deelgemeente,
          zipcode: el.Postcode.postcode_deelgemeente,
          longitude: el.Postcode.longitude,
          latitude: el.Postcode.latitude,
        });
      });
    }
  })
  .catch(err => console.log(err));
  if(i<1E4) i++;
  else clearInterval(interval);
}, 10);
