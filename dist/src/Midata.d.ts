import { TokenResponse, UserRole, AuthResponse } from './api';
import { Promise } from 'es6-promise';
import { ApiCallResponse } from './util';
import { Resource } from "./resources/Resource";
export interface User {
    name?: string;
    id?: string;
    email?: string;
    language?: language;
}
export declare type language = 'en' | 'de' | 'it' | 'fr';
export declare class Midata {
    private _host;
    private _appName;
    private _secret;
    private _conformanceStatementEndpoint;
    private _authToken;
    private _refreshToken;
    private _authCode;
    private _tokenEndpoint;
    private _authEndpoint;
    private _user;
    private _iab;
    private _platform;
    private _state;
    private _codeVerifier;
    private _codeChallenge;
    /**
     * @param _host The url of the midata server, e.g. "https://test.midata.coop:9000".
     * @param _appName The internal application name accessing the platform (as defined on the midata platform).
     * @param _conformanceStatementEndpoint? The location of the endpoint identifying the OAuth authorize and token
     *        endpoints. Optional parameter.
     */
    constructor(_host: string, _appName: string, _secret?: string, _conformanceStatementEndpoint?: string);
    readonly loggedIn: boolean;
    readonly authToken: string;
    readonly refreshToken: string;
    readonly user: User;
    setUserEmail(email: string): void;
    setUserLanguage(language: language): void;
    changePlatform(host: string, conformanceStatementEndpoint?: string): void;
    logout(): void;
    private _setLoginData(authToken, refreshToken, user?);
    /**
     * Login to the MIDATA platform. This method has to be called prior to
     * creating or updating resources.
     *
     * @deprecated only use this method if your app does not support oAuth2 authentication
     * @param username The user's identifier, most likely an email address.
     * @param password The user's password.
     * @param role The user's role used during the login (optional).
     * @return If the login was successful the return value will be a resolved
     *         promise that contains the newly generated authentication and
     *         refresh token. In case the login failed the return value
     *         will be a rejected promise containing the error message.
     */
    login(username: string, password: string, role?: UserRole): Promise<AuthResponse>;
    /**
     *
     * This method stores a resource onto midata.
     *
     * @param resourceType e.g. HeartRate
     * @return The promise returns the created object. In case of failure, an error of type
     *         ApiCallResponse will be returned.
     */
    save(resource: Resource | any): Promise<ApiCallResponse>;
    /**
     Helper method in order to retry a specific operation (e.g. save or search) on the API.
     *
     * @param maxRetries How many times the method should retry the operation before aborting
     * @param fn The callback function to be executed
     * @param args? Optional additional arguments that should be passed into the callback function
     * @return Promise<ApiCallResponse>
     */
    private _retry(maxRetries, fn, ...args);
    /**
     Helper method to create FHIR resources via a HTTP POST call.
     */
    private _create;
    /**
     Helper method to create FHIR resources via a HTTP PUT call.
     */
    private _update;
    /**
     Helper method to refresh the authentication token by authorizing
     with the help of the refresh token. This will generate a new authentication as well as
     a new refresh token. On successful refresh, the old refresh_token will be invalid and
     both the access_token and the refresh_token will be overwritten. Previous access_tokens
     will remain valid until their expiration timestamp is exceeded.

     @param withRefreshToken? Optional refresh token coming from an external source e.g. the phone's secure storage
     @return Promise<ApiCallResponse>
     */
    refresh: (withRefreshToken?: string) => Promise<ApiCallResponse>;
    /**
     * Query the midata API using FHIR resource types and optional params.
     *
     * @param resourceType e.g. Observation
     * @param params e.g. {status: 'preliminary'}
     * @return The promise returns an array of objects matching the search param(s). In case of failure, an error of type
     *         ApiCallResponse will be returned.
     */
    search(resourceType: string, params?: any): Promise<ApiCallResponse>;
    /**
     Helper method to query the FHIR API.
     * @param baseUrl for target API Call (e.g. Observation)
     * @param params e.g. {code: '29463-7'} for BodyWeight
     * @return Promise<ApiCallResponse>
     */
    private _search(baseUrl, params?);
    /**
     Login to the MIDATA platform. This method has to be called prior to
     creating or updating resources. Calling authenticate will initiate the
     oAuth2 authentication process. This method invokes the methods _authenticate &
     _exchangeTokenForCode.

     @return If the login process was successful the return value will be a resolved
     promise that contains the newly generated authentication and
     refresh token. In case the login failed the return value
     will be a rejected promise containing the error message (type any).
     **/
    authenticateOBSOLETE(): Promise<TokenResponse>;
    /**
     The user will be redirected to midata.coop in order to login / register and grant
     the application access to his data. If the event target is equal to the callback url
     defined in the USERAUTH_ENDPOINT (and ,therefore, authentication on midata was successful)
     the authentication code is extracted in stored locally. The authentication code will then be further
     used by the method _exchangeTokenForCode().

     @return A Promise of type InAppBrowserEvent.
     **/
    authenticate(): Promise<ApiCallResponse>;
    /**
     After successful authentication on midata this method is invoked. It exchanges the authCode
     obtained from midata with the access_token used to query the FHIR endpoint API.

     @return On success the resolved promise will hold a body of type TokenResponse as defined in the interface within
     the api class. On failure the catch clause will forward an error of type ApiCallResponse.
     **/
    private _exchangeTokenForCode();
    private _initSessionParams(length);
    private _initRndString(length);
    /**
     This method fetches the conformance statement identifying the OAuth authorize
     and token endpoint URLs for use in requesting authorization to access FHIR resources.
     This method is invoked whenever a new midata object is created. However, it can also
     exclusively be called in order to update existing endpoint information.

     @return In both cases (on success & and failure) the method will return a resolved promise of type ApiCallResponse
     conforming to the interface defined within the util class.
     **/
    fetchFHIRConformanceStatement(): Promise<ApiCallResponse>;
}
