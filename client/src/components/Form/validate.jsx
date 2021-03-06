import React from "react";

export default function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = '*Breed name is required'
        errors.button = true;
    }
    else if (input.name && !/^[a-zA-Z\s]*$/.test(input.name)) {
        errors.name = 'Breed name must only contain letters'
        errors.button = true;
    }
    else if (input.name && input.name.length > 30) {
        errors.name = 'Breed name must not be larger than 30 characters'
        errors.button = true;
    }
    else if (input.name && input.name.length < 3) {
        errors.name = 'Breed name must have at least 3 characters'
        errors.button = true;
    };
    if (!input.weight) {
        errors.weight = '*Weight is required'
        errors.button = true;
    } else if (!/^(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$/.test(input.weight)) {
        errors.weight = 'Weight must have a "minWeight-maxWeight" format'
        errors.button = true;
    } else {
        let wDif = input.weight.split('-');
        if (Number(wDif[0]) > Number(wDif[1])) {
            errors.weight = 'Maximum weight must be greater than the minimum weight'
            errors.button = true;
        }
        if(Number(wDif[0] === 0)){
            errors.weight = "Minimum weight can't be zero"
            errors.button = true;
        }
        if(Number(wDif[0] > 9999) || Number(wDif[1] > 10000)) {
            errors.weight = "Weight is too big"
            errors.button = true;
        }
    }
    if (!input.height) {
        errors.height = '*Height is required'
        errors.button = true;
    } else if (!/^(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$/.test(input.height)) {
        errors.height = 'Height must be in a "minHeight-maxHeight" format'
        errors.button = true;

    } else {
        let hDif = input.height.split('-');
        if (Number(hDif[0]) > Number(hDif[1])) {
            errors.height = 'Maximum height must be greater than minimum height'
            errors.button = true;
        }
        if(Number(hDif[0] === 0)){
            errors.height = "Minimum height can't be zero"
            errors.button = true;
        }
        if(Number(hDif[0] > 9999) || Number(hDif[1] > 10000)) {
            errors.height = "Height is too big"
            errors.button = true;
        }
    }

    if (input.life_span) {
        if (!/^(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$/.test(input.life_span)) {
            errors.life_span = 'Life span must be in a "minYears-maxYears" format'
            errors.button = true;
        } else {
            let lSpan = input.life_span.split('-');
            if (Number(lSpan[1]) < Number(lSpan[0])) {
                errors.life_span = 'Maximum years of life must be greater than minimum years of life'
                errors.button = true;
            }
            if(Number(lSpan[0]) === 0) {
                errors.life_span = "Minimum years of life can't be zero"
                errors.button = true;
            }
        }
    }
    if (input.image && !/^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)((.*))?$/.test(input.image)) {
        errors.image = 'URL must have a valid image extension'
        errors.button = true;
    }
    if (input.origin && !/^[a-zA-Z\s]*$/.test(input.origin)) {
        errors.origin = 'Country of Origin must only contain letters'
        errors.button = true;
    }
    if (Object.keys(errors) === 1) {
        errors.button = false
    }
    return errors;
}