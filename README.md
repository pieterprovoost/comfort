# comfort

Calculation of the PMV and PPD indices and local thermal comfort criteria (ISO 7730:2006).

## Usage

```javascript
var comfort = require("../comfort");
console.log(JSON.stringify(new comfort.Pmv(1.2, 0, 22, 22, 0.5, 0.1, 60), null, 4));
```

Output:

```
{
    "m": 69.78,
    "w": 0,
    "ts": 33.74616,
    "tcl": 28.95609161796622,
    "diffusion": -11.158407552070983,
    "sweat": -4.884600000000001,
    "evaporation": -16.043007552070982,
    "vapour": -5.077497051214532,
    "temperature": -1.172304,
    "respiration": -6.249801051214533,
    "conduction": -61.80733396172624,
    "radiation": -32.232903586899155,
    "convection": -29.57443037433431,
    "pmv": -0.7528544478053655,
    "balance": -14.320142564518978
}
```
