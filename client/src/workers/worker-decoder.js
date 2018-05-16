/*eslint-env worker */

let bufferMp3 = new Uint8Array(0);
let counterBuffer = 0;

onmessage = ({ data }) => {
  bufferMp3 = new Uint8Array([...bufferMp3, ...new Uint8Array(data.decode)]);

  if (counterBuffer === 0) {
    self.postMessage({ bufferMp3 }, [bufferMp3.buffer]);
    bufferMp3 = new Uint8Array(0);
    counterBuffer = 0;
    return;
  }
  counterBuffer++;
};
