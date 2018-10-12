//k6 config file

import http from 'k6/http';
import { sleep, check } from 'k6';
// import faker from 'faker';

export let options = {
  vus: 100,
  stages: [
    {
      rps: 1000,
      duration: '120s'
    },
    {
      rps: 2000,
      duration: '120s'
    },
    {
      rps: 3000,
      duration: '120s'
    },
    {
      rps: 4000,
      duration: '120s'
    }
  ]
};

export default function() {
  var popular_id = Math.ceil(Math.random() * 5000 + 10000001);
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  var popular = Math.random() > 0.2;

  let res = http.get(`http://localhost:3000/api/v1/artists/${popular ? popular_id : id}/albums`);
  check(res, {
    'status was 200': r => r.status == 200,
    'server under load threshold': r => r.status !== 503,
    'transaction time OK': r => r.timings.duration < 1000
  });
  sleep(1);
}

/* 
export default function() {
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  var url = `http://localhost:3001/api/v1/artists/${id}\albums`;
  var payload = JSON.stringify({ albumName: faker.name.findName(), albumImage: `https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/${faker.random.number({ min: 1, max: 1000 })}.jpg`, publishedYear: faker.random.number({ min: 1960, max: 2018 }), artist_id: id });
  var params = { headers: { 'Content-Type': 'application/json' } };
  http.post(url, payload, params);

  let res = http.post(url, payload, params);
  check(res, {
    'status was 201': r => r.status == 201,
    'transaction time OK': r => r.timings.duration < 1000
  });
  sleep(1);
};
 */
