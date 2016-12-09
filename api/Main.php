<?php
require_once 'Controller.php';
class Main implements Controller {

    private $result;

    public function __construct($params) {
        $this->result = [
            'main_image'=>"http://keenthemes.com/preview/metronic/theme/assets/global/plugins/jcrop/demos/demo_files/image1.jpg"
        ];
    }

    public function execute() {
        return json_encode($this->result);
    }
}