<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = file_get_contents("php://input");
        $file = fopen("data/done_data.xml", "w");

        fwrite($file, $data);
        fclose($file);

    } elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
        $data = file_get_contents("data/done_data.xml");

        echo $data;
    }
?>