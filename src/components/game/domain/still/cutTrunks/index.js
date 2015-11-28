import THREE from 'three';

import CutTrunk from '../cutTrunk';

import plotModelsOnGrid from '../../plotModelsOnGrid';

class CutTrunks {
    constructor (input) {
        const width = input && input.width || 1000;
        const height = input && input.height || 1000;
        const freeGridPositions = input && input.freeGridPositions;

        const cutTrunk = new CutTrunk(input);

        // Cut trunks.
        const cutTrunks = plotModelsOnGrid({
            freeGridPositions: freeGridPositions,
            model: cutTrunk,
            numberModelsToPlot: 100,
            positionY: 0,
            rotate: true,
            scale: {
                min: 0.4,
                max: 0.6
            }
        });

        cutTrunks.group.name = 'cut-trunks';

        return cutTrunks;
    }
}

module.exports = CutTrunks;