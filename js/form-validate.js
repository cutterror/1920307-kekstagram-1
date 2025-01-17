import {checkLength, checkElementUniqueness} from './util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REG = /^#[A-za-zА-Яа-яЁё\d]{1,19}$/;

const validateHashtagsFormat = (hashtagString) => hashtagString === '' ? true : hashtagString.split(' ').every((hashtag) => HASHTAG_REG.test(hashtag));

const validateUniquenessHashtag = (hashtagString) => checkElementUniqueness(hashtagString.toLowerCase().split(' '));

const validateHashtagsCount = (hashtagString) => checkLength(hashtagString.split(' '), MAX_HASHTAGS_COUNT);

const validateDescriptionLength = (description) => checkLength(description, MAX_DESCRIPTION_LENGTH);

const getFormValidator = (form, hashtagsField, descriptionField) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error-text',
  });
  pristine.addValidator(
    hashtagsField,
    validateHashtagsFormat,
    `Хэш-тэги должны быть вида #hashtag, не длиннее ${MAX_HASHTAG_LENGTH} символов, разделены пробелами и не содержать спец. символы`,
    1
  );
  pristine.addValidator(
    hashtagsField,
    validateUniquenessHashtag,
    'Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру)',
    2
  );
  pristine.addValidator(
    hashtagsField,
    validateHashtagsCount,
    `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
    3
  );
  pristine.addValidator(
    descriptionField,
    validateDescriptionLength,
    `Максимальная длина комментария ${MAX_DESCRIPTION_LENGTH} символов`
  );
  return pristine;
};

export {getFormValidator};
