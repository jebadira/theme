'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('../../node_modules/material-ui/styles/colors');
var _ASUcolors = require('./asuColors');

var _colorManipulator = require('../../node_modules/material-ui/utils/colorManipulator');

var _spacing = require('../../node_modules/material-ui/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: _ASUcolors.ASUMaroon,
    primary2Color: _ASUcolors.ASUBlue,
    primary3Color: _ASUcolors.ASUGreen,
    accent1Color: _ASUcolors.ASUGold,
    accent2Color: _ASUcolors.ASUGrey,
    accent3Color: _ASUcolors.ASUOrange,
    textColor: _colors.darkBlack,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
    alternateTextColor: _colors.white,
    canvasColor: _ASUcolors.ASUWhiteBackground,
    borderColor: _colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
    pickerHeaderColor:  _ASUcolors.ASUBlue,
    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
    shadowColor: _colors.fullBlack
  },
  appBar : {
    textColor : _ASUcolors.lightBlack
  }
}; /**
    * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
    */