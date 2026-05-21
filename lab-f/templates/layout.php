<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Szymon Szymaniec (57760) - PTW LAB F</title>
    <link rel="stylesheet" href="css/style.css"
</head>
<body>
    <div class="main-container">
        <form method="POST">
            <div class="grid">
                <div class="col">
                    <select name="input">
                        <option value="csv" <?= $input === 'csv' ? 'selected' : '' ?>>CSV</option>
                        <option value="tsv" <?= $input === 'tsv' ? 'selected' : '' ?>>TSV</option>
                        <option value="ssv" <?= $input === 'ssv' ? 'selected' : '' ?>>SSV</option>
                        <option value="json" <?= $input === 'json' ? 'selected' : '' ?>>JSON</option>
                        <option value="yaml" <?= $input === 'yaml' ? 'selected' : '' ?>>YAML</option>
                    </select>
                    <textarea name="inData" rows="20" placeholder="Wprowadź dane wejściowe..."><?= htmlspecialchars($inData) ?></textarea>
                </div>
                <div class="col">
                    <select name="output">
                        <option value="csv" <?= $output === 'csv' ? 'selected' : '' ?>>CSV</option>
                        <option value="tsv" <?= $output === 'tsv' ? 'selected' : '' ?>>TSV</option>
                        <option value="ssv" <?= $output === 'ssv' ? 'selected' : '' ?>>SSV</option>
                        <option value="json" <?= $output === 'json' ? 'selected' : '' ?>>JSON</option>
                        <option value="yaml" <?= $output === 'yaml' ? 'selected' : '' ?>>YAML</option>
                    </select>
                    <pre><?= htmlspecialchars($outData) ?></pre>
                </div>
            </div>
            <button type="submit">convert</button>
        </form>
    </div>
    <footer>
        <p>Stronę wykonał: Szymon Szymaniec. lab-f PTW</p>
    </footer>
</body>
</html>
