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
 * @interface Student
 */
export interface Student {
    /**
     * 
     * @type {string}
     * @memberof Student
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof Student
     */
    groupId: number;
    /**
     * 
     * @type {boolean}
     * @memberof Student
     */
    status: boolean;
    /**
     * 
     * @type {number}
     * @memberof Student
     */
    id: number;
    /**
     * 
     * @type {Date}
     * @memberof Student
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Student
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the Student interface.
 */
export function instanceOfStudent(value: object): value is Student {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function StudentFromJSON(json: any): Student {
    return StudentFromJSONTyped(json, false);
}

export function StudentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Student {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'groupId': json['groupId'],
        'status': json['status'],
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function StudentToJSON(value?: Student | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'groupId': value['groupId'],
        'status': value['status'],
        'id': value['id'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
    };
}

