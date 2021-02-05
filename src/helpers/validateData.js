import validateAr from './validateArr';

const validateData = (data, setCriticalError) => {
  // console.log('validateData', data[0].data);
  data &&
    data.forEach((item, idx, newAr) => {
      const subAr =
        item.data.length > 1
          ? item.data.map((el, index, rowArr) => {
              // console.log(`el- ${idx}-${index} : `, el);
              try {
                if (validateAr[index](el, index, rowArr, newAr)) return false;
              } catch (error) {
                console.log('error', error.message);
                setCriticalError(true);
              }
              // return el.length > 64 ? false : true;
              return true;
            })
          : [];
      newAr[idx].myErrors = subAr;
    });
  // ---------- validate Phone & Email ------------
  data &&
    data.forEach((item, idx, newAr) => {
      // console.log(` --- item idx: ${idx}, Phone: ${item.data[1]}, Email: ${item.data[2]}`);
      const currentPhone = item.data[1];
      let duplicatePhoneIndex = -1;
      const currentEmail = item.data[2] && item.data[2].toLowerCase();
      let duplicateEmailIndex = -1;
      newAr.forEach((arr, i) => {
        if (currentPhone === arr.data[1] && i !== idx) {
          duplicatePhoneIndex =
            duplicatePhoneIndex !== -1 ? duplicatePhoneIndex : i + 1;
        }

        const comparedEmail = arr.data[2] && arr.data[2].toLowerCase();
        if (currentEmail === comparedEmail && i !== idx) {
          duplicateEmailIndex =
            duplicateEmailIndex !== -1 ? duplicateEmailIndex : i + 1;
        }
      });
      let lessIndex;
      if (duplicatePhoneIndex !== -1 && duplicateEmailIndex !== -1) {
        if (duplicatePhoneIndex < duplicateEmailIndex) {
          lessIndex = duplicatePhoneIndex;
          newAr[idx].myErrors[1] = false;
        } else {
          lessIndex = duplicateEmailIndex;
          newAr[idx].myErrors[2] = false;
        }
      }
      if (duplicatePhoneIndex !== -1 && duplicateEmailIndex === -1) {
        lessIndex = duplicatePhoneIndex;
        newAr[idx].myErrors[1] = false;
      }
      if (duplicatePhoneIndex === -1 && duplicateEmailIndex !== -1) {
        lessIndex = duplicateEmailIndex;
        newAr[idx].myErrors[2] = false;
      }

      newAr[idx].duplicate = lessIndex;
    });
  // ----------------------
};

export default validateData;
