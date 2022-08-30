<?php

    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');

    $conn=mysqli_connect('localhost', 'root', '', 'cruddatabase');

    if(isset($_POST['name'])){
        $files=$_FILES['picture'];
        $name=mysqli_real_escape_string($conn,$_POST['name']);

$filename=$files['name'];
$templocation=$files['tmp_name'];
$uploaderrors=$files['error'];

$splitedname=explode('.',$filename);
$fileextension=strtolower(end($splitedname));

$allowed_extentions=['png,','jpg','jpeg'];

if(in_array($fileextension,$allowed_extentions)){
    if($uploaderrors===0){
        $new_file_name=uniqid().'.'.$fileextension;
        $file_destination='public/images/'.$new_file_name;
    if(move_uploaded_file($templocation,$file_destination)){
        $connection="INSERT INTO upload_images_in_react(name,picture)VALUES('$name', '$new_file_name')";
        if(mysqli_query($conn,$connection)){
            echo 'success';
        }else{
            echo 'could not insert data into the database';
        }
    }else{
        echo 'could not upload the image';
    }
    }else{
        echo 'there was an error in upoading';
    }
}else{
    echo 'files with this extension not allowed';
}
    }

if(isset($_POST['fetch'])){
    $query='SELECT * FROM upload_images_in_react';
    $resuslt=mysqli_query($conn,$query);
    $product=mysqli_fetch_all($resuslt,MYSQLI_ASSOC);

    echo json_encode($product);
}