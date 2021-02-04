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
      let duplicatePhoneIndex = null;
      const currentEmail = item.data[2] && item.data[2].toLowerCase();
      let duplicateEmailIndex = null;
      newAr.forEach((arr, i) => {
        if (currentPhone === arr.data[1] && i !== idx) {
          duplicatePhoneIndex =
            duplicatePhoneIndex !== null ? duplicatePhoneIndex : i;
        }

        const comparedEmail = arr.data[2] && arr.data[2].toLowerCase();
        if (currentEmail === comparedEmail && i !== idx) {
          duplicateEmailIndex =
            duplicateEmailIndex !== null ? duplicateEmailIndex : i;
        }
      });
      let lessIndex;
      if (duplicatePhoneIndex !== null && duplicateEmailIndex !== null) {
        if (duplicatePhoneIndex < duplicateEmailIndex) {
          lessIndex = duplicatePhoneIndex;
          newAr[idx].myErrors[1] = false;
        } else {
          lessIndex = duplicateEmailIndex;
          newAr[idx].myErrors[2] = false;
        }
      }
      if (duplicatePhoneIndex !== null && duplicateEmailIndex === null) {
        lessIndex = duplicatePhoneIndex;
        newAr[idx].myErrors[1] = false;
      }
      if (duplicatePhoneIndex === null && duplicateEmailIndex !== null) {
        lessIndex = duplicateEmailIndex;
        newAr[idx].myErrors[2] = false;
      }

      newAr[idx].duplicate = lessIndex;
    });
  // ----------------------
};

export default validateData;
