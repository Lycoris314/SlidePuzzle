<?php
//header("Content-Type: application/json; charset=utf-8");

$exclude = "";
if (isset($_GET["exclude"]) && $_GET["exclude"] != "") {
    $exclude = $_GET["exclude"];
}


$imgDir = new DirectoryIterator("img");
$passImg = [];


foreach ($imgDir as $file) {
    if (!$file->isFile())
        continue;

    $name = $file->getFileName();

    //拡張子のチェック
    $ext = substr($name, strrpos($name, '.') + 1);

    if (!($ext == "jpg" || $ext == "jpeg" || $ext == "png"))
        continue;

    $size = getimagesize("img/" . $name);

    if (!$size)
        continue;

    $imagetype = $size[2];

    if (!($imagetype == IMAGETYPE_JPEG || !$imagetype == IMAGETYPE_PNG))
        continue;

    $width = $size[0];
    $height = $size[1];

    if ($height > 1000 || $height == 0)
        continue;

    if (!($height == $width))
        continue;

    if ($exclude != "" && str_contains($name, $exclude))
        continue;

    $passImg[] = $name;
}

$thumbnailDir = new DirectoryIterator("img/thumbnail");
$passThumbnail = [];

foreach ($thumbnailDir as $file) {

    if (!$file->isFile())
        continue;

    $name = $file->getFileName();

    if (!in_array($name, $passImg))
        continue;

    $size = getimagesize("img/thumbnail/" . $name);

    if (!$size)
        continue;

    $imagetype = $size[2];

    if (!($imagetype == IMAGETYPE_JPEG || !$imagetype == IMAGETYPE_PNG))
        continue;

    $width = $size[0];
    $height = $size[1];

    if (!($width == 100 && $height == 100))
        continue;

    $passThumbnail[] = $name;
}


echo json_encode($passThumbnail);

