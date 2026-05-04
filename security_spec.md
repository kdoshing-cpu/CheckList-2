# Security Specification - Pintura Labranza Pro

## Data Invariants
1. A user can only read and write their own task progress.
2. A prospection entry must belong to the user who created it.
3. Prospection entries must have valid workshop references.
4. Timestamps must be server-generated.

## The Dirty Dozen Payloads (Rejection Tests)
1. Write progress to another user's document ID.
2. Update progress without `userId` matching `request.auth.uid`.
3. Create prospection with a future `createdAt` timestamp (not server time).
4. Create prospection with an extremely long `workshopName` (ID poisoning).
5. Update prospection's `userId` after creation (identity spoofing).
6. Update a terminal field (if any were defined, but here mostly ownership).
7. List prospections without filtering by `userId` (query scraper).
8. Create prospection with invalid `satisfaction` (e.g., 99).
9. Delete a prospection owned by another user.
10. Update progress with "Ghost Fields" like `isAdmin: true`.
11. Inject 1MB string into `notes`.
12. Create progress for a user that isn't signed in.

## Test Runner (Logic Check)
The `firestore.rules` will be verified against these patterns.
