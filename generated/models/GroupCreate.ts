/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GroupCreate
 */
export interface GroupCreate {
    /**
     * 
     * @type {string}
     * @memberof GroupCreate
     */
    groupNumber: string;
    /**
     * 
     * @type {number}
     * @memberof GroupCreate
     */
    courseNumber: number;
}

/**
 * Check if a given object implements the GroupCreate interface.
 */
export function instanceOfGroupCreate(value: object): value is GroupCreate {
    if (!('groupNumber' in value) || value['groupNumber'] === undefined) return false;
    if (!('courseNumber' in value) || value['courseNumber'] === undefined) return false;
    return true;
}

export function GroupCreateFromJSON(json: any): GroupCreate {
    return GroupCreateFromJSONTyped(json, false);
}

export function GroupCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupCreate {
    if (json == null) {
        return json;
    }
    return {
        
        'groupNumber': json['groupNumber'],
        'courseNumber': json['courseNumber'],
    };
}

export function GroupCreateToJSON(value?: GroupCreate | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupNumber': value['groupNumber'],
        'courseNumber': value['courseNumber'],
    };
}

