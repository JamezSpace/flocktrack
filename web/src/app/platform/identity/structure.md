## **Identity State**

| State | Meaning |
|---|---|
| `IDLE` | No identity retrieval has been initiated. |
| `LOADING` | Identity is being retrieved from the backend. |
| `LOADED` | Application identity has been successfully retrieved and is available. |
| `ERROR` | Identity retrieval failed. |

## **Session State**

| State | Meaning |
|---|---|
| `INITIALIZING` | Firebase has not yet settled its initial authentication state. |
| `AUTHENTICATED` | Firebase has established an authenticated user session. |
| `UNAUTHENTICATED` | Firebase has established that no authenticated user session exists. |
| `ERROR` | Session initialization or restoration failed. |

## **Relationship Between Session and Identity States**

Session state represents the user's authentication status within Firebase,
while identity state represents the availability of the user's application
identity within FlockTrack.

An authenticated session does not necessarily imply a loaded application
identity. Both states must be considered before granting access to the
authenticated application workspace.