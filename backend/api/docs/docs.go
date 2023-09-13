// Code generated by swaggo/swag. DO NOT EDIT.

package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/login": {
            "post": {
                "description": "Log in a user with username and password.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Authentication"
                ],
                "summary": "User login",
                "parameters": [
                    {
                        "description": "User credentials",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.CreateUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User logged in",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/logout": {
            "get": {
                "description": "Log out the current user.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Authentication"
                ],
                "summary": "User logout",
                "responses": {
                    "200": {
                        "description": "User logged out",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/peers/{name}": {
            "get": {
                "description": "Retrieve information about a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Get information about a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer information",
                        "schema": {
                            "$ref": "#/definitions/models.Peer"
                        }
                    },
                    "404": {
                        "description": "Peer not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            },
            "put": {
                "description": "Update a peer's information by name.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Update a peer's information",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Updated peer information",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.peerUpdateBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer updated",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Fields cannot be empty",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Delete a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer deleted",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "Peer not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/peers/{name}/conf": {
            "get": {
                "description": "Retrieve a peer's config by name.",
                "produces": [
                    "text/plain"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Get a peer's config",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer config",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "404": {
                        "description": "Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/peers/{name}/pause": {
            "put": {
                "description": "Pause a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Pause a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer paused",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer already paused\" \"Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/peers/{name}/reset": {
            "put": {
                "description": "Reset a peer's usage by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Reset a peer's usage",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer usage reset",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/peers/{name}/resume": {
            "put": {
                "description": "Resume a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers"
                ],
                "summary": "Resume a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer resumed",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer already active\" \"Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/signup": {
            "post": {
                "description": "Register a new user account with a username and password.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Authentication"
                ],
                "summary": "Create a new user account",
                "parameters": [
                    {
                        "description": "User credentials",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.CreateUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User created",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/systems": {
            "get": {
                "description": "Retrieve a list of systems.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "System List",
                "responses": {}
            },
            "post": {
                "description": "Create a new system with the specified name.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "Create a new system",
                "parameters": [
                    {
                        "description": "System details",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.systemCreateBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "System created",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Fields to read body",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/systems/{name}": {
            "get": {
                "description": "description for SystemShow.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "System Show",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "default": 1,
                        "description": "Page number",
                        "name": "page",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "default": 10,
                        "description": "Items per page",
                        "name": "per_page",
                        "in": "query"
                    },
                    {
                        "enum": [
                            "desc",
                            "asc"
                        ],
                        "type": "string",
                        "default": "\"asc\"",
                        "description": "Order",
                        "name": "order",
                        "in": "query"
                    },
                    {
                        "enum": [
                            "expire_date",
                            "usage"
                        ],
                        "type": "string",
                        "default": "\"expire_date\"",
                        "description": "Sort by",
                        "name": "sort_by",
                        "in": "query"
                    },
                    {
                        "enum": [
                            "enable",
                            "disable"
                        ],
                        "type": "string",
                        "description": "Status by",
                        "name": "status",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "default": "",
                        "description": "Peer name",
                        "name": "peer_name",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "System information",
                        "schema": {
                            "$ref": "#/definitions/models.SystemInfo"
                        }
                    },
                    "400": {
                        "description": "Invalid page number\" \"Invalid per page number\" \"Invalid system fetching",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/systems/{name}/add_usage": {
            "put": {
                "description": "Adds usage to last usage for all peers of a system.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "Adds usage to last usage",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Usage added to last usage",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/systems/{name}/peers": {
            "post": {
                "description": "Create a new peer for a system by name.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "Create a new peer for a system",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Peer details",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.systemCreatePeerBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer created",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Fields to read body",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/systems/{name}/reload": {
            "post": {
                "description": "Reload a system by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems"
                ],
                "summary": "Reload a system",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "System reloaded",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/test/peers/{name}/pause": {
            "put": {
                "description": "Pause a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers",
                    "Test"
                ],
                "summary": "Pause a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer paused",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer already paused\" \"Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/test/peers/{name}/reset": {
            "put": {
                "description": "Reset a peer's usage by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers",
                    "Test"
                ],
                "summary": "Reset a peer's usage",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer usage reset",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/test/peers/{name}/resume": {
            "put": {
                "description": "Resume a peer by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Peers",
                    "Test"
                ],
                "summary": "Resume a peer",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Peer name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer resumed",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Peer already active\" \"Peer not found\" \"System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/test/systems/{name}/peers": {
            "post": {
                "description": "Create a new peer for a system by name.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Systems",
                    "Test"
                ],
                "summary": "Create a new peer for a system",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Peer details",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.systemCreatePeerBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Peer created",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "400": {
                        "description": "Fields to read body",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/test/systems/{name}/reload": {
            "post": {
                "description": "Reload a system by name.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Test",
                    "Systems"
                ],
                "summary": "Reload a system",
                "parameters": [
                    {
                        "type": "string",
                        "description": "System name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "System reloaded",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    },
                    "404": {
                        "description": "System not found",
                        "schema": {
                            "$ref": "#/definitions/gin.H"
                        }
                    }
                }
            }
        },
        "/validate": {
            "get": {
                "description": "Check if the user is logged in and the session is valid.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Authentication"
                ],
                "summary": "Validate user session",
                "responses": {
                    "200": {
                        "description": "User is logged in",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "controllers.CreateUserRequest": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "controllers.peerUpdateBody": {
            "type": "object",
            "properties": {
                "allowed_ip": {
                    "type": "string"
                },
                "buy_date": {
                    "type": "string"
                },
                "config_end_point": {
                    "type": "string"
                },
                "data_limit": {
                    "type": "number"
                },
                "email": {
                    "type": "string"
                },
                "expire_date": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                }
            }
        },
        "controllers.systemCreateBody": {
            "type": "object",
            "required": [
                "name"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "startedDate": {
                    "type": "string"
                }
            }
        },
        "controllers.systemCreatePeerBody": {
            "type": "object",
            "properties": {
                "allowed_ip": {
                    "type": "string"
                },
                "buy_date": {
                    "type": "string"
                },
                "config_end_point": {
                    "type": "string"
                },
                "data_limit": {
                    "type": "number"
                },
                "email": {
                    "type": "string"
                },
                "expire_date": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                }
            }
        },
        "gin.H": {
            "type": "object",
            "additionalProperties": {}
        },
        "models.Peer": {
            "type": "object",
            "properties": {
                "allowed_ip": {
                    "type": "string"
                },
                "buy_date": {
                    "type": "string"
                },
                "config_end_point": {
                    "type": "string"
                },
                "data_limit": {
                    "type": "number"
                },
                "email": {
                    "type": "string"
                },
                "end_point": {
                    "type": "string"
                },
                "expire_date": {
                    "type": "string"
                },
                "is_active": {
                    "type": "boolean"
                },
                "last_handshake": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                },
                "usage": {
                    "type": "number"
                }
            }
        },
        "models.PeerInfo": {
            "type": "object",
            "properties": {
                "buyDate": {
                    "type": "string"
                },
                "dataLimit": {
                    "type": "number"
                },
                "expireDate": {
                    "type": "string"
                },
                "isActive": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "usage": {
                    "type": "number"
                }
            }
        },
        "models.SystemInfo": {
            "type": "object",
            "properties": {
                "activePeersCount": {
                    "type": "integer"
                },
                "allPeersCount": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "peers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.PeerInfo"
                    }
                },
                "startedDate": {
                    "type": "string"
                },
                "totalUsage": {
                    "type": "number"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Wireguard API",
	Description:      "This is a Wireguard API server.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
