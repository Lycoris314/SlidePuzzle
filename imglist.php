<?php
$exclude = "";
if (isset($_GET["exclude"]) && $_GET["exclude"] != "") {
    $exclude = $_GET["exclude"];
}




//print getimagesize("img/default.jpg")[0];
$imgDir = new DirectoryIterator("img");
$passImg =[];

$thumbnailDir = new DirectoryIterator("img/thumbnail");
$passThumbnail=[];

foreach ($imgDir as $file) {
    if (!$file->isFile()) continue;

    $name = $file->getFileName();

    $ext = substr($name, strrpos($name, '.') + 1);

    if(!($ext=="jpg" || $ext=="jpeg" || $ext=="png")) continue;

    $size = getimagesize("img/" . $name );

    //echo $name;

    //echo "mime=", mime_content_type("img/" . $name), "<br>";

    if(!$size) continue;

    $imagetype = $size[2];

    if(!($imagetype==IMAGETYPE_JPEG || !$imagetype==IMAGETYPE_PNG)) continue;
    //PDFファイルをjpegと認識してしまう。

    $width = $size[0];
    $height = $size[1];

    if($height>1000 || $height==0) continue;

    if(!($height==$width)) continue;

    

    //echo $file->getFileName(), "<br>";
    //echo $size[0]," ",$size[1]," ",$size[2];
    //print "<br>";

    $passImg[] = $name;
}

//print_r($passImg);
//echo "<br>";

foreach($thumbnailDir as $file){

    if (!$file->isFile()) continue;

    $name = $file->getFileName();

    if(!in_array($name,$passImg)) continue;

    $size = getimagesize("img/thumbnail/" . $name );

    if(!$size) continue;

    $imagetype = $size[2];

    if(!($imagetype==IMAGETYPE_JPEG || !$imagetype==IMAGETYPE_PNG)) continue;

    $width = $size[0];
    $height = $size[1];

    if(!($width==100 && $height==100)) continue;
    
    $passThumbnail[]=$name;
}

print_r($passThumbnail);
