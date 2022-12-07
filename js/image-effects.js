const EFFECTS_PARAMS = {
  'none': {
    sliderOptions: {
      range: {
        min: 0,
        max: 0,
      },
      start: 0,
      step: 0,
    },
    effect: '',
    unit: '',
  },
  'chrome': {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'grayscale',
    unit: '',
  },
  'sepia': {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'sepia',
    unit: '',
  },
  'marvin': {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    effect: 'invert',
    unit: '%',
  },
  'phobos': {
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'blur',
    unit: 'px',
  },
  'heat': {
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'brightness',
    unit: '',
  }
};

const DEFAULT_EFFECT = 'none';

const DEFAULT_EFFECTS_PARAMS = {
  range: {
    min: EFFECTS_PARAMS[DEFAULT_EFFECT].sliderOptions.range.min,
    max: EFFECTS_PARAMS[DEFAULT_EFFECT].sliderOptions.range.max,
  },
  start: EFFECTS_PARAMS[DEFAULT_EFFECT].sliderOptions.start,
  step: EFFECTS_PARAMS[DEFAULT_EFFECT].sliderOptions.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const radioEffectsOptions = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');
const effectStrengthSlider = document.querySelector('.effect-level__slider');
const effectStrengthField = document.querySelector('.effect-level__value');

const hideSlider = () => {
  effectStrengthSlider.classList.add('hidden');
};

const createSlider = () => {
  noUiSlider.create(effectStrengthSlider, DEFAULT_EFFECTS_PARAMS);
  hideSlider();
};

const getNameSelectedEffect = () => document.querySelector('input[name="effect"]:checked').value;

const showSlider = () => {
  effectStrengthSlider.classList.remove('hidden');
};

const setUpdatedEffectStrengthField = () => {
  effectStrengthField.value = effectStrengthSlider.noUiSlider.get();
};

const setEffectValue = () => {
  const nameSelectedEffect = getNameSelectedEffect();
  previewImage.style.filter = nameSelectedEffect === DEFAULT_EFFECT ? '' : `${EFFECTS_PARAMS[nameSelectedEffect].effect}(${effectStrengthField.value}${EFFECTS_PARAMS[nameSelectedEffect].unit})`;
};

const updateSlider = () => {
  const nameSelectedEffect = getNameSelectedEffect();
  if(nameSelectedEffect !== DEFAULT_EFFECT) {
    effectStrengthSlider.noUiSlider.on('update', setUpdatedEffectStrengthField);
    effectStrengthSlider.noUiSlider.on('update', setEffectValue);
    effectStrengthSlider.noUiSlider.updateOptions(EFFECTS_PARAMS[nameSelectedEffect].sliderOptions);
    showSlider();
  } else {
    hideSlider();
  }
};

const updateImage = () => {
  const nameSelectedEffect = getNameSelectedEffect();
  previewImage.classList.value = `effects__preview--${nameSelectedEffect}`;
  setEffectValue();
};

const removePictureEffectsControl = () => {
  effectStrengthSlider.noUiSlider.destroy();
  previewImage.style.filter = '';
  previewImage.classList.value = `effects__preview--${DEFAULT_EFFECT}`;
  effectStrengthField.value = DEFAULT_EFFECT;
};

const updateSliderAndImage = () => {
  updateSlider();
  updateImage();
};

const addPictureEffectsControl = () => {
  createSlider();
  radioEffectsOptions.forEach((effect) => {
    effect.addEventListener('change', updateSliderAndImage);
  });
};

export {addPictureEffectsControl, removePictureEffectsControl};
