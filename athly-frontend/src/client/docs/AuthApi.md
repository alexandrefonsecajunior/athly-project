# AuthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authControllerGetStravaAuthUrl**](AuthApi.md#authcontrollergetstravaauthurl) | **GET** /auth/strava/url |  |
| [**authControllerLogin**](AuthApi.md#authcontrollerlogin) | **POST** /auth/login |  |
| [**authControllerRegister**](AuthApi.md#authcontrollerregister) | **POST** /auth/register |  |
| [**authControllerStravaCallback**](AuthApi.md#authcontrollerstravacallback) | **POST** /auth/strava/callback |  |



## authControllerGetStravaAuthUrl

> AuthControllerGetStravaAuthUrl200Response authControllerGetStravaAuthUrl()



### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthControllerGetStravaAuthUrlRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  try {
    const data = await api.authControllerGetStravaAuthUrl();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AuthControllerGetStravaAuthUrl200Response**](AuthControllerGetStravaAuthUrl200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authControllerLogin

> AuthPayload authControllerLogin(loginDto)



### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthControllerLoginRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // LoginDto
    loginDto: ...,
  } satisfies AuthControllerLoginRequest;

  try {
    const data = await api.authControllerLogin(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginDto** | [LoginDto](LoginDto.md) |  | |

### Return type

[**AuthPayload**](AuthPayload.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authControllerRegister

> AuthPayload authControllerRegister(registerUserDto)



### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthControllerRegisterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // RegisterUserDto
    registerUserDto: ...,
  } satisfies AuthControllerRegisterRequest;

  try {
    const data = await api.authControllerRegister(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **registerUserDto** | [RegisterUserDto](RegisterUserDto.md) |  | |

### Return type

[**AuthPayload**](AuthPayload.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authControllerStravaCallback

> AuthPayload authControllerStravaCallback(stravaCallbackDto)



### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthControllerStravaCallbackRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // StravaCallbackDto
    stravaCallbackDto: ...,
  } satisfies AuthControllerStravaCallbackRequest;

  try {
    const data = await api.authControllerStravaCallback(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **stravaCallbackDto** | [StravaCallbackDto](StravaCallbackDto.md) |  | |

### Return type

[**AuthPayload**](AuthPayload.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

