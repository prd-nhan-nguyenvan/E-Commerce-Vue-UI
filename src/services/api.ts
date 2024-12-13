/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Login {
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string
  /**
   * Password
   * @minLength 1
   */
  password: string
}

export interface LoginResponse {
  /**
   * Access token
   * @minLength 1
   */
  access_token: string
  /** Expires in */
  expires_in: number
  /**
   * Token type
   * @minLength 1
   */
  token_type: string
  /**
   * Scope
   * @minLength 1
   */
  scope: string
  /**
   * Refresh token
   * @minLength 1
   */
  refresh_token: string
}

export interface Register {
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username: string
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string
  /**
   * Password
   * @minLength 1
   */
  password: string
  /** Role */
  role?: 'admin' | 'user' | 'staff'
}

export interface RefreshToken {
  /**
   * Refresh
   * @minLength 1
   */
  refresh: string
}

export interface CartItem {
  /** ID */
  id?: number
  /** Product */
  product: number
  /**
   * Quantity
   * @min 0
   * @max 4294967295
   */
  quantity?: number
}

export interface Cart {
  items?: CartItem[]
}

export interface AddToCart {
  /** Product id */
  product_id: number
  /**
   * Quantity
   * @min 1
   */
  quantity: number
}

export interface OrderItem {
  /** ID */
  id?: number
  /** Product */
  product: number
  /**
   * Quantity
   * @min 0
   * @max 4294967295
   */
  quantity: number
  /**
   * Price at purchase
   * @format decimal
   */
  price_at_purchase?: string
}

export interface Order {
  /** ID */
  id?: number
  /** User */
  user?: number
  /** Status */
  status?: 'pd' | 'sb' | 'pr' | 'de' | 'cp' | 'df' | 'cn'
  /** Total price */
  total_price?: string
  /**
   * Address
   * @minLength 1
   */
  address?: string
  items?: OrderItem[]
  /**
   * Created at
   * @format date-time
   */
  created_at?: string
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string
}

export interface OrderStatusUpdate {
  /** Status */
  status?: 'pd' | 'sb' | 'pr' | 'de' | 'cp' | 'df' | 'cn'
}

export interface AddOrderItem {
  /** Product */
  product: number
  /**
   * Quantity
   * @min 1
   */
  quantity: number
}

export interface Category {
  /** ID */
  id?: number
  /**
   * Name
   * @minLength 1
   * @maxLength 255
   */
  name: string
  /**
   * Slug
   * @format slug
   * @minLength 1
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string
  /**
   * Description
   * @maxLength 1000
   */
  description?: string | null
}

export interface PaginatedCategory {
  /** Count */
  count: number
  /**
   * Next
   * @minLength 1
   */
  next: string
  /**
   * Previous
   * @minLength 1
   */
  previous: string
  results: Category[]
}

export interface Product {
  /** ID */
  id?: number
  /** Category */
  category: number
  /**
   * Name
   * @minLength 1
   * @maxLength 255
   */
  name: string
  /**
   * Slug
   * @format slug
   * @maxLength 255
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string
  /**
   * Description
   * @minLength 1
   */
  description: string
  /**
   * Price
   * @format decimal
   */
  price: string
  /**
   * Sell price
   * @format decimal
   */
  sell_price: string
  /** On sell */
  on_sell?: boolean
  /**
   * Stock
   * @min 0
   * @max 4294967295
   */
  stock: number
  /**
   * Image
   * @format uri
   */
  image?: string | null
  /** Image url */
  image_url?: string
  /**
   * Created at
   * @format date-time
   */
  created_at?: string
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string
}

export interface ProductSearchResponse {
  /** Count */
  count: number
  /**
   * Next
   * @minLength 1
   */
  next?: string | null
  /**
   * Previous
   * @minLength 1
   */
  previous?: string | null
  results: Product[]
}

export interface Review {
  /** ID */
  id?: number
  /** Product */
  product: number
  /** User */
  user?: number
  /**
   * Rating
   * @min 0
   * @max 4294967295
   */
  rating: number
  /** Comment */
  comment?: string
  /**
   * Created at
   * @format date-time
   */
  created_at?: string
  /**
   * Updated at
   * @format date-time
   */
  updated_at?: string
}

export interface SuggestionSearchResponse {
  suggestions: string[]
}

export interface UserList {
  /** ID */
  id?: number
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username: string
  /** Role */
  role?: 'admin' | 'user' | 'staff'
  /** Is active */
  is_active?: boolean
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string
}

export interface PaginationUserList {
  /** Count */
  count: number
  /** Next */
  next: string
  /** Previous */
  previous: string
  results: UserList[]
}

export interface ChangePassword {
  /**
   * Old password
   * @minLength 1
   */
  old_password: string
  /**
   * New password
   * @minLength 1
   */
  new_password: string
}

export interface UserProfile {
  /** ID */
  id?: number
  /** User */
  user?: number
  /**
   * Role
   * @minLength 1
   */
  role?: string
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email?: string
  /**
   * Username
   * @minLength 1
   */
  username?: string
  /**
   * First name
   * @minLength 1
   */
  first_name: string
  /**
   * Last name
   * @minLength 1
   */
  last_name: string
  /** Bio */
  bio?: string | null
  /**
   * Profile picture
   * @format uri
   */
  profile_picture?: string | null
  /**
   * Phone number
   * @maxLength 15
   */
  phone_number?: string
  /** Address */
  address?: string
}

export interface UserSupportDetail {
  /**
   * First name
   * @maxLength 30
   */
  first_name?: string
  /**
   * Last name
   * @maxLength 30
   */
  last_name?: string
  /** Bio */
  bio?: string
  /**
   * Profile picture
   * @format uri
   */
  profile_picture?: string | null
  /**
   * Phone number
   * @maxLength 15
   */
  phone_number?: string
  /** Address */
  address?: string
}

export interface UserDetail {
  /** ID */
  id?: number
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username: string
  /** Role */
  role?: 'admin' | 'user' | 'staff'
  /** Is active */
  is_active?: boolean
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null
  profile?: UserSupportDetail
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://127.0.0.1:8000/api'
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title E-Commerce API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000/api
 * @contact <nhan.nguyenvan@paradox.ai>
 *
 * API documentation for E-Commerce project
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @description Authenticate a user and return access and refresh tokens.
     *
     * @tags Authentication
     * @name AuthLoginCreate
     * @summary User Login
     * @request POST:/auth/login/
     * @secure
     */
    authLoginCreate: (data: Login, params: RequestParams = {}) =>
      this.request<LoginResponse, void>({
        path: `/auth/login/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Revoke access and refresh tokens for the authenticated user, logging them out.
     *
     * @tags Authentication
     * @name AuthLogoutCreate
     * @summary Logout
     * @request POST:/auth/logout/
     * @secure
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/logout/`,
        method: 'POST',
        secure: true,
        ...params
      }),

    /**
     * @description Register a new user account.
     *
     * @tags Authentication
     * @name AuthRegisterCreate
     * @summary Register User
     * @request POST:/auth/register/
     * @secure
     */
    authRegisterCreate: (data: Register, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/register/`,
        method: 'POST',
        body: data,
        secure: true,
        ...params
      }),

    /**
     * @description Allows admin users to create staff accounts.
     *
     * @tags Authentication
     * @name AuthRegisterStaffCreate
     * @summary Create Staff Account
     * @request POST:/auth/register/staff/
     * @secure
     */
    authRegisterStaffCreate: (data: Register, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/register/staff/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Provide a refresh token to generate a new access token. The refresh token remains valid for its lifetime.
     *
     * @tags Authentication
     * @name AuthTokenRefreshCreate
     * @summary Refresh Access Token
     * @request POST:/auth/token/refresh/
     * @secure
     */
    authTokenRefreshCreate: (data: RefreshToken, params: RequestParams = {}) =>
      this.request<LoginResponse, void>({
        path: `/auth/token/refresh/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  carts = {
    /**
     * @description Retrieve the cart for the logged-in user
     *
     * @tags Cart
     * @name CartsList
     * @request GET:/carts/
     * @secure
     */
    cartsList: (params: RequestParams = {}) =>
      this.request<
        Cart,
        {
          /** @example "Authentication credentials were not provided." */
          detail?: string
        }
      >({
        path: `/carts/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Empty the cart
     *
     * @tags Cart
     * @name CartsEmptyDelete
     * @request DELETE:/carts/empty/
     * @secure
     */
    cartsEmptyDelete: (params: RequestParams = {}) =>
      this.request<
        void,
        {
          /** @example "Authentication credentials were not provided." */
          detail?: string
        }
      >({
        path: `/carts/empty/`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Add an item to the cart
     *
     * @tags Cart
     * @name CartsItemsCreate
     * @request POST:/carts/items/
     * @secure
     */
    cartsItemsCreate: (data: AddToCart, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Item added to cart successfully" */
          message?: string
          cart_item?: any
        },
        | {
            detail?: object
          }
        | {
            /** @example "Authentication credentials were not provided." */
            detail?: string
          }
      >({
        path: `/carts/items/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Update the quantity of an item in the cart
     *
     * @tags Cart
     * @name CartsItemsPartialUpdate
     * @request PATCH:/carts/items/{product_id}/
     * @secure
     */
    cartsItemsPartialUpdate: (
      productId: string,
      data: {
        /**
         * @min 1
         * @example 1
         */
        quantity?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @example "Cart item updated successfully" */
          message?: string
          cart_item?: any
        },
        {
          /** @example "Item not found in cart." */
          detail?: string
        }
      >({
        path: `/carts/items/${productId}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Remove an item from the cart
     *
     * @tags Cart
     * @name CartsItemsDelete
     * @request DELETE:/carts/items/{product_id}/
     * @secure
     */
    cartsItemsDelete: (productId: string, params: RequestParams = {}) =>
      this.request<
        void,
        {
          /** @example "Item not found in cart." */
          detail?: string
        }
      >({
        path: `/carts/items/${productId}/`,
        method: 'DELETE',
        secure: true,
        ...params
      })
  }
  orders = {
    /**
     * No description
     *
     * @tags Order
     * @name OrdersList
     * @request GET:/orders/
     * @secure
     */
    ordersList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number
        /** The initial index from which to return the results. */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number
          /** @format uri */
          next?: string | null
          /** @format uri */
          previous?: string | null
          results: Order[]
        },
        any
      >({
        path: `/orders/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersCreate
     * @request POST:/orders/
     * @secure
     */
    ordersCreate: (data: Order, params: RequestParams = {}) =>
      this.request<Order, void>({
        path: `/orders/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsList
     * @request GET:/orders/admin/lists/
     * @secure
     */
    ordersAdminListsList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number
        /** The initial index from which to return the results. */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number
          /** @format uri */
          next?: string | null
          /** @format uri */
          previous?: string | null
          results: Order[]
        },
        any
      >({
        path: `/orders/admin/lists/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsRead
     * @request GET:/orders/admin/lists/{id}/
     * @secure
     */
    ordersAdminListsRead: (id: number, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/admin/lists/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsUpdate
     * @request PUT:/orders/admin/lists/{id}/
     * @secure
     */
    ordersAdminListsUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/admin/lists/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsPartialUpdate
     * @request PATCH:/orders/admin/lists/{id}/
     * @secure
     */
    ordersAdminListsPartialUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/admin/lists/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsDelete
     * @request DELETE:/orders/admin/lists/{id}/
     * @secure
     */
    ordersAdminListsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/admin/lists/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAdminListsUpdateStatusCreate
     * @request POST:/orders/admin/lists/{order_id}/update-status/
     * @secure
     */
    ordersAdminListsUpdateStatusCreate: (
      orderId: string,
      data: OrderStatusUpdate,
      params: RequestParams = {}
    ) =>
      this.request<OrderStatusUpdate, any>({
        path: `/orders/admin/lists/${orderId}/update-status/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersRead
     * @request GET:/orders/{id}/
     * @secure
     */
    ordersRead: (id: number, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersUpdate
     * @request PUT:/orders/{id}/
     * @secure
     */
    ordersUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersPartialUpdate
     * @request PATCH:/orders/{id}/
     * @secure
     */
    ordersPartialUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersDelete
     * @request DELETE:/orders/{id}/
     * @secure
     */
    ordersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersAddCreate
     * @request POST:/orders/{order_id}/add/
     * @secure
     */
    ordersAddCreate: (orderId: string, data: AddOrderItem, params: RequestParams = {}) =>
      this.request<AddOrderItem, any>({
        path: `/orders/${orderId}/add/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersRemoveDelete
     * @request DELETE:/orders/{order_id}/remove/{product_id}
     * @secure
     */
    ordersRemoveDelete: (orderId: string, productId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${orderId}/remove/${productId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrdersUpdateStatusCreate
     * @request POST:/orders/{order_id}/update-status/
     * @secure
     */
    ordersUpdateStatusCreate: (
      orderId: string,
      data: OrderStatusUpdate,
      params: RequestParams = {}
    ) =>
      this.request<OrderStatusUpdate, any>({
        path: `/orders/${orderId}/update-status/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params
      })
  }
  products = {
    /**
     * @description Returns a paginated list of all categories available in the system.
     *
     * @tags Categories
     * @name ProductsCategoriesList
     * @summary Retrieve all categories
     * @request GET:/products/categories/
     * @secure
     */
    productsCategoriesList: (
      query?: {
        /**
         * Number of items to retrieve per page
         * @default 10
         */
        limit?: number
        /**
         * Starting position of items to retrieve
         * @default 0
         */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCategory, void>({
        path: `/products/categories/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Allows admin or staff to create a new category.
     *
     * @tags Categories
     * @name ProductsCategoriesCreate
     * @summary Create a new category
     * @request POST:/products/categories/
     * @secure
     */
    productsCategoriesCreate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/products/categories/`,
        method: 'POST',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name ProductsCategoriesSlugRead
     * @request GET:/products/categories/slug/{slug}/
     * @secure
     */
    productsCategoriesSlugRead: (slug: string, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/categories/slug/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Fetch details of a category by its primary key (id).
     *
     * @tags Categories
     * @name ProductsCategoriesRead
     * @summary Retrieve a specific category
     * @request GET:/products/categories/{id}/
     * @secure
     */
    productsCategoriesRead: (id: string, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/products/categories/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Fully update an existing category using its primary key (PUT).
     *
     * @tags Categories
     * @name ProductsCategoriesUpdate
     * @summary Fully update a category
     * @request PUT:/products/categories/{id}/
     * @secure
     */
    productsCategoriesUpdate: (id: string, data: Category, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/products/categories/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Partially update an existing category using its primary key (PATCH).
     *
     * @tags Categories
     * @name ProductsCategoriesPartialUpdate
     * @summary Partially update a category
     * @request PATCH:/products/categories/{id}/
     * @secure
     */
    productsCategoriesPartialUpdate: (id: string, data: Category, params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/products/categories/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a category by its primary key (id).
     *
     * @tags Categories
     * @name ProductsCategoriesDelete
     * @summary Delete a category
     * @request DELETE:/products/categories/{id}/
     * @secure
     */
    productsCategoriesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products/categories/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Retrieve a paginated list of products with filtering, ordering, and search capabilities.
     *
     * @tags Products
     * @name ProductsProductsList
     * @summary List products
     * @request GET:/products/products/
     * @secure
     */
    productsProductsList: (
      query?: {
        limit?: number
        offset?: number
        category?: number
        price_lt?: number
        price_gt?: number
        name?: string
        description?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<Product[], any>({
        path: `/products/products/`,
        method: 'GET',
        query: query,
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params
      }),

    /**
     * @description Create a new product in the system.
     *
     * @tags Products
     * @name ProductsProductsCreate
     * @summary Create a product
     * @request POST:/products/products/
     * @secure
     */
    productsProductsCreate: (
      data: {
        category: number
        /**
         * @minLength 1
         * @maxLength 255
         */
        name: string
        /**
         * @format slug
         * @maxLength 255
         * @pattern ^[-a-zA-Z0-9_]+$
         */
        slug?: string
        /** @minLength 1 */
        description: string
        /** @format decimal */
        price: string
        /** @format decimal */
        sell_price: string
        on_sell?: boolean
        /**
         * @min 0
         * @max 4294967295
         */
        stock: number
        /** @format binary */
        image?: File | null
      },
      params: RequestParams = {}
    ) =>
      this.request<Product, void>({
        path: `/products/products/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsProductsBulkImportCreate
     * @request POST:/products/products/bulk-import/
     * @secure
     */
    productsProductsBulkImportCreate: (
      data: {
        /**
         * CSV file with product data
         * @format binary
         */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/products/products/bulk-import/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsProductsSearchList
     * @request GET:/products/products/search/
     * @secure
     */
    productsProductsSearchList: (
      query?: {
        /** Search query */
        q?: string
        /** Limit for pagination */
        limit?: number
        /** Offset for pagination */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ProductSearchResponse, void>({
        path: `/products/products/search/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsProductsSlugRead
     * @request GET:/products/products/slug/{slug}/
     * @secure
     */
    productsProductsSlugRead: (slug: string, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/products/slug/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieve the details of a specific product by its ID.
     *
     * @tags Products
     * @name ProductsProductsRead
     * @summary Retrieve product details
     * @request GET:/products/products/{id}/
     * @secure
     */
    productsProductsRead: (id: number, params: RequestParams = {}) =>
      this.request<Product, void>({
        path: `/products/products/${id}/`,
        method: 'GET',
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params
      }),

    /**
     * @description Update the details of a product. Includes validation for price and sell price.
     *
     * @tags Products
     * @name ProductsProductsUpdate
     * @summary Update product details
     * @request PUT:/products/products/{id}/
     * @secure
     */
    productsProductsUpdate: (
      id: number,
      data: {
        category: number
        /**
         * @minLength 1
         * @maxLength 255
         */
        name: string
        /**
         * @format slug
         * @maxLength 255
         * @pattern ^[-a-zA-Z0-9_]+$
         */
        slug?: string
        /** @minLength 1 */
        description: string
        /** @format decimal */
        price: string
        /** @format decimal */
        sell_price: string
        on_sell?: boolean
        /**
         * @min 0
         * @max 4294967295
         */
        stock: number
        /** @format binary */
        image?: File | null
      },
      params: RequestParams = {}
    ) =>
      this.request<Product, void>({
        path: `/products/products/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * @description Update specific fields of a product.
     *
     * @tags Products
     * @name ProductsProductsPartialUpdate
     * @summary Partially update product details
     * @request PATCH:/products/products/{id}/
     * @secure
     */
    productsProductsPartialUpdate: (
      id: number,
      data: {
        category: number
        /**
         * @minLength 1
         * @maxLength 255
         */
        name: string
        /**
         * @format slug
         * @maxLength 255
         * @pattern ^[-a-zA-Z0-9_]+$
         */
        slug?: string
        /** @minLength 1 */
        description: string
        /** @format decimal */
        price: string
        /** @format decimal */
        sell_price: string
        on_sell?: boolean
        /**
         * @min 0
         * @max 4294967295
         */
        stock: number
        /** @format binary */
        image?: File | null
      },
      params: RequestParams = {}
    ) =>
      this.request<Product, void>({
        path: `/products/products/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a product by its ID. This action is irreversible.
     *
     * @tags Products
     * @name ProductsProductsDelete
     * @summary Delete a product
     * @request DELETE:/products/products/{id}/
     * @secure
     */
    productsProductsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products/products/${id}/`,
        method: 'DELETE',
        secure: true,
        type: ContentType.UrlEncoded,
        ...params
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ProductsProductsReviewsList
     * @request GET:/products/products/{product_id}/reviews/
     * @secure
     */
    productsProductsReviewsList: (
      productId: string,
      query?: {
        /** Number of results to return per page. */
        limit?: number
        /** The initial index from which to return the results. */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          count: number
          /** @format uri */
          next?: string | null
          /** @format uri */
          previous?: string | null
          results: Review[]
        },
        any
      >({
        path: `/products/products/${productId}/reviews/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsProductsSimilarList
     * @request GET:/products/products/{product_id}/similar/
     * @secure
     */
    productsProductsSimilarList: (
      productId: string,
      query?: {
        /** Limit for pagination */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ProductSearchResponse, void>({
        path: `/products/products/${productId}/similar/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ProductsReviewsCreate
     * @request POST:/products/reviews/
     * @secure
     */
    productsReviewsCreate: (data: Review, params: RequestParams = {}) =>
      this.request<Review, any>({
        path: `/products/reviews/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  search = {
    /**
     * @description Get suggestions for search query
     *
     * @tags Search
     * @name SearchSuggest
     * @summary Get suggestions for search query
     * @request GET:/search/suggest/
     * @secure
     */
    searchSuggest: (
      query?: {
        /** Search query */
        query?: string
        /** Number of suggestions to return */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<SuggestionSearchResponse, void>({
        path: `/search/suggest/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
  users = {
    /**
     * @description Retrieve a list of all users. Supports filtering by fields like 'email' and 'is_active', searching by 'email' and 'username', and ordering by various fields.
     *
     * @tags User
     * @name UsersList
     * @summary List All Users
     * @request GET:/users/
     * @secure
     */
    usersList: (
      query?: {
        /** Filter by email */
        email?: string
        /** Filter by active status */
        is_active?: boolean
        /** Search by email or username */
        search?: string
        /** Order by fields (e.g., '-date_joined') */
        ordering?: string
        /** Number of results to return per page */
        limit?: number
        /** The initial index from which to return the results */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginationUserList, void>({
        path: `/users/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Allow authenticated users to change their password. The current password must be provided for verification.
     *
     * @tags User
     * @name UsersPasswordChangePartialUpdate
     * @summary Change Password
     * @request PATCH:/users/password/change/
     * @secure
     */
    usersPasswordChangePartialUpdate: (data: ChangePassword, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/password/change/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Retrieve the profile details of the authenticated user.
     *
     * @tags User
     * @name UsersProfileRead
     * @summary Retrieve User Profile
     * @request GET:/users/profile/
     * @secure
     */
    usersProfileRead: (params: RequestParams = {}) =>
      this.request<UserProfile, void>({
        path: `/users/profile/`,
        method: 'GET',
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params
      }),

    /**
     * @description Update the profile details of the authenticated user. Certain fields like 'user' and 'role' are read-only.
     *
     * @tags User
     * @name UsersProfileUpdate
     * @summary Update User Profile
     * @request PUT:/users/profile/
     * @secure
     */
    usersProfileUpdate: (
      data: {
        /** @minLength 1 */
        first_name: string
        /** @minLength 1 */
        last_name: string
        bio?: string | null
        /** @format binary */
        profile_picture?: File | null
        /** @maxLength 15 */
        phone_number?: string
        address?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/users/profile/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params
      }),

    /**
     * @description Partially update specific profile fields of the authenticated user.
     *
     * @tags User
     * @name UsersProfilePartialUpdate
     * @summary Partially Update User Profile
     * @request PATCH:/users/profile/
     * @secure
     */
    usersProfilePartialUpdate: (
      data: {
        /** @minLength 1 */
        first_name: string
        /** @minLength 1 */
        last_name: string
        bio?: string | null
        /** @format binary */
        profile_picture?: File | null
        /** @maxLength 15 */
        phone_number?: string
        address?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/users/profile/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params
      }),

    /**
     * @description Retrieve detailed information about a specific user by their ID.
     *
     * @tags User
     * @name UsersRead
     * @summary Retrieve User Details
     * @request GET:/users/{id}/
     * @secure
     */
    usersRead: (id: number, params: RequestParams = {}) =>
      this.request<UserDetail, void>({
        path: `/users/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update user details. Supports actions like 'block' (deactivate user) and 'unblock' (reactivate user).
     *
     * @tags User
     * @name UsersPartialUpdate
     * @summary Update User Details
     * @request PATCH:/users/{id}/
     * @secure
     */
    usersPartialUpdate: (
      id: number,
      data: {
        /** Specify the action: 'block' or 'unblock'. */
        action: 'block' | 'unblock'
      },
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/users/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      })
  }
}
