import todoSaga from './todoSaga';

export default function* () {
  yield [todoSaga()];
}
