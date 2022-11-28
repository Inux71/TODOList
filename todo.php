<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = file_get_contents("php://input");
        $file = fopen("data/todo_data.xml", "w");

        fwrite($file, $data);
        fclose($file);
    }
?>