<#
    SCRIPT
        Created and modified by jbs4bmx
    CODE
        Auto-generated by ChatGPT.
    NOTE
        Requires PowerShell 7 or later.
#>

# Function to generate a MongoDB ObjectID
function Generate-MongoDBObjectId {
    # Get the current timestamp in seconds since Unix epoch
    $timestamp = [int]([DateTimeOffset]::Now.ToUnixTimeSeconds())
    # Generate a random 8-byte value (16 characters in hexadecimal)
    $randomBytes = -join ((0..9) + ('a'..'f') | Get-Random -Count 16)
    # Construct the ObjectID
    $objectId = "$('{0:x}' -f $timestamp)$randomBytes"
    return $objectId
}

Clear-Host

$count = Read-Host "Enter number of IDs to generate"

# Generate n MongoDB ObjectIDs
for ($i = 1; $i -le $count; $i++) {
    $objectId = Generate-MongoDBObjectId
    Write-Output $objectId
}

Write-Output "`nTimeStamp == $timestamp"
Write-Output "RandomBytes == $randomBytes"
