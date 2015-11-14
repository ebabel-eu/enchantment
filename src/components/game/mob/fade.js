// Fade a model's opacity to a given value.
module.exports = function fade (input) {

	const model = input && input.model;
	let opacity = input && input.opacity;

	const setOpacity = function setOpacity (material, opacity) {
		material.opacity = opacity;
	}

    // Opacity of a mob that is still alive can't be less than 0.1, which is the opacity of a dead mob.
    if (model.userData.dead === false && input.opacity < 0.1) {
        opacity = 0.1;
    }

	if (model.material) {
		setOpacity(model.material, opacity);
	}

    if (model.children && model.children.length > 0) {
    	model.children.map(function (child) {
    		setOpacity(child.material, opacity);
    	});
    }
};