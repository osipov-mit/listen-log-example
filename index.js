import { GearApi, GearKeyring } from '@gear-js/api';
import { isHex } from '@polkadot/util';

/**
 *
 * @param {string} destination - accountId
 * @param {string[]} sourcesList - list of program ids
 */
async function listenLogs(destination, sourcesList) {
  if (!isHex(destination)) {
    destination = GearKeyring.decodeAddress(destination);
  }
  const gearApi = await GearApi.create();
  gearApi.gearEvents.subscribeLogEvents(({ data }) => {
    if (destination === data.dest.toHex() && sourcesList.includes(data.source.toHex())) {
      console.log(data.payload.toString);
    }
  });
}
