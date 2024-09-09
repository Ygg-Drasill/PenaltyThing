// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Tobias Bay",
            "url": "http://penaltything.social/support",
            "email": "tab@penaltything.social"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/law/create": {
            "post": {
                "description": "create law",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "law"
                ],
                "summary": "Create new law",
                "operationId": "createLaw",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/CreateLawRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Law"
                        }
                    }
                }
            }
        },
        "/law/getByTeam": {
            "get": {
                "description": "get all laws in a team by teamId",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "law"
                ],
                "summary": "Get laws",
                "operationId": "getLaws",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Team ID",
                        "name": "teamId",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Law"
                            }
                        }
                    }
                }
            }
        },
        "/penalty/add": {
            "post": {
                "description": "Add penalty to member of team",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "penalty"
                ],
                "summary": "Add penalty to team member",
                "operationId": "addPenalty",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/AddPenaltyRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/PenaltyEntry"
                        }
                    }
                }
            }
        },
        "/team/addUserToTeam": {
            "post": {
                "description": "Add user to team",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "team"
                ],
                "summary": "Add user to team",
                "operationId": "addUserToTeam",
                "parameters": [
                    {
                        "description": "request params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/AddUserToTeamRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Team"
                        }
                    }
                }
            }
        },
        "/team/create": {
            "post": {
                "description": "Create a new team",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "team"
                ],
                "summary": "Create new team",
                "operationId": "createTeam",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/CreateTeamRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Team"
                        }
                    }
                }
            }
        },
        "/team/getByUserId": {
            "get": {
                "description": "Get all teams that a user is a member of",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "team"
                ],
                "summary": "Get teams by user id",
                "operationId": "getTeamsByUserId",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID",
                        "name": "userId",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Team"
                            }
                        }
                    }
                }
            }
        },
        "/user/all": {
            "get": {
                "description": "Get all users",
                "consumes": [
                    "application/json",
                    "application/vnd.api+json"
                ],
                "produces": [
                    "application/json",
                    "application/vnd.api+json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "Get all users",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/UserPublic"
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/user/authenticate": {
            "post": {
                "description": "Authenticate user using username and password",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "Authenticate user",
                "operationId": "authenticateUser",
                "parameters": [
                    {
                        "description": "User credentials",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/AuthenticateUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/UserPublic"
                        }
                    }
                }
            }
        },
        "/user/get": {
            "get": {
                "description": "get user",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "Get user",
                "operationId": "getUser",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User search by id",
                        "name": "id",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/UserPublic"
                        }
                    }
                }
            }
        },
        "/user/register": {
            "post": {
                "description": "Register new user, given password will be encrypted on backend. This is subject to change",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "summary": "Register user",
                "operationId": "registerUser",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/RegisterUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "AddPenaltyRequest": {
            "type": "object",
            "properties": {
                "comment": {
                    "type": "string"
                },
                "issuerUserId": {
                    "type": "string"
                },
                "lawId": {
                    "type": "string"
                },
                "targetUserId": {
                    "type": "string"
                }
            }
        },
        "AddUserToTeamRequest": {
            "type": "object"
        },
        "AuthenticateUserRequest": {
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
        "CreateLawRequest": {
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "teamId": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "CreateTeamRequest": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "Law": {
            "type": "object",
            "properties": {
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "teamId": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "PenaltyEntry": {
            "type": "object",
            "properties": {
                "comment": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "isNew": {
                    "type": "boolean"
                },
                "issuedBy": {
                    "type": "string"
                },
                "law": {
                    "$ref": "#/definitions/Law"
                },
                "lawId": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "RegisterUserRequest": {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "Team": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "law": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Law"
                    }
                },
                "member": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/TeamMember"
                    }
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "TeamMember": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "teamId": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "User": {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "penalties": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/PenaltyEntry"
                    }
                },
                "teamMembers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/TeamMember"
                    }
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "UserPublic": {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "userName": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "PenaltyThing API",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
