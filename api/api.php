<?php
if(isset($_POST["c"]) && isset($_POST['params'])) {
    $class = $_POST['c'];
    if(file_exists($class.".php")) {
        require_once $class . ".php";
    }
    $class = ucfirst($class);
    if(class_exists($class) && is_subclass_of($class, Controller::class)) {
        echo (new $class($_POST['params']))->execute();
    }
}