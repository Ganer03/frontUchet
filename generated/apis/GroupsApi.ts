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


import * as runtime from '../runtime';
import type {
  Group,
  GroupCreate,
  GroupUpdate,
  HTTPValidationError,
} from '../models/index';
import {
    GroupFromJSON,
    GroupToJSON,
    GroupCreateFromJSON,
    GroupCreateToJSON,
    GroupUpdateFromJSON,
    GroupUpdateToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
} from '../models/index';

export interface CreateGroupGroupsPostRequest {
    groupCreate: GroupCreate;
}

export interface DeleteGroupGroupsGroupIdDeleteRequest {
    groupId: number;
}

export interface ReadGroupGroupsGroupIdGetRequest {
    groupId: number;
}

export interface UpdateGroupGroupsGroupIdPutRequest {
    groupId: number;
    groupUpdate: GroupUpdate;
}

/**
 * 
 */
export class GroupsApi extends runtime.BaseAPI {

    /**
     * Create Group
     */
    async createGroupGroupsPostRaw(requestParameters: CreateGroupGroupsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters['groupCreate'] == null) {
            throw new runtime.RequiredError(
                'groupCreate',
                'Required parameter "groupCreate" was null or undefined when calling createGroupGroupsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/groups/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GroupCreateToJSON(requestParameters['groupCreate']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * Create Group
     */
    async createGroupGroupsPost(requestParameters: CreateGroupGroupsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.createGroupGroupsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete Group
     */
    async deleteGroupGroupsGroupIdDeleteRaw(requestParameters: DeleteGroupGroupsGroupIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters['groupId'] == null) {
            throw new runtime.RequiredError(
                'groupId',
                'Required parameter "groupId" was null or undefined when calling deleteGroupGroupsGroupIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters['groupId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * Delete Group
     */
    async deleteGroupGroupsGroupIdDelete(requestParameters: DeleteGroupGroupsGroupIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.deleteGroupGroupsGroupIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Groups
     */
    async getGroupsGroupsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Group>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GroupFromJSON));
    }

    /**
     * Get Groups
     */
    async getGroupsGroupsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Group>> {
        const response = await this.getGroupsGroupsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Read Group
     */
    async readGroupGroupsGroupIdGetRaw(requestParameters: ReadGroupGroupsGroupIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters['groupId'] == null) {
            throw new runtime.RequiredError(
                'groupId',
                'Required parameter "groupId" was null or undefined when calling readGroupGroupsGroupIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters['groupId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * Read Group
     */
    async readGroupGroupsGroupIdGet(requestParameters: ReadGroupGroupsGroupIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.readGroupGroupsGroupIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Group
     */
    async updateGroupGroupsGroupIdPutRaw(requestParameters: UpdateGroupGroupsGroupIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters['groupId'] == null) {
            throw new runtime.RequiredError(
                'groupId',
                'Required parameter "groupId" was null or undefined when calling updateGroupGroupsGroupIdPut().'
            );
        }

        if (requestParameters['groupUpdate'] == null) {
            throw new runtime.RequiredError(
                'groupUpdate',
                'Required parameter "groupUpdate" was null or undefined when calling updateGroupGroupsGroupIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/groups/{group_id}`.replace(`{${"group_id"}}`, encodeURIComponent(String(requestParameters['groupId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: GroupUpdateToJSON(requestParameters['groupUpdate']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * Update Group
     */
    async updateGroupGroupsGroupIdPut(requestParameters: UpdateGroupGroupsGroupIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.updateGroupGroupsGroupIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}