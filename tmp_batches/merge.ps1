$base = 'C:/Users/Administrator/Desktop/korean-learning-app/tmp_batches'
$all = @()

for ($i = 1; $i -le 4; $i++) {
    $respRaw = Get-Content "$base/response_$i.json" -Raw -Encoding UTF8 | ConvertFrom-Json
    $content = $respRaw.choices[0].message.content.Trim()
    if ($content.StartsWith('```')) {
        $lines = $content -split "`n"
        $content = ($lines[1..($lines.Length-2)] -join "`n").Trim()
    }
    $batch = $content | ConvertFrom-Json
    $all += $batch
}

$out = 'C:/Users/Administrator/Desktop/korean-learning-app/vocab_examples_3_4.json'
$json = $all | ConvertTo-Json -Depth 10
# Write as UTF-8 without BOM
[System.IO.File]::WriteAllText($out, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done. Total: $($all.Count) words. Saved to $out"
