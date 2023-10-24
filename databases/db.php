<?php header("Access-Control-Allow-Origin: *");

include "../define.php";

$db = new mysqli( HOST, USER, PASSWORD, DB_NAME,PORT);
switch ($_POST["action"]) {
    case "language":
        $selectedLanguage = $_POST["language"];
        $sql = "INSERT INTO languages(language)
            SELECT '$selectedLanguage'
            WHERE NOT EXISTS (SELECT * FROM languages WHERE language = '$selectedLanguage')";

        $db->query($sql);
        break;

    case "topic":
        $selectedTopic = $_POST["topic"];
        $selectedLanguage = $_POST["language"];

        $langIDQuery = "SELECT langID FROM languages WHERE language = '$selectedLanguage'";
        $langIDResult = $db->query($langIDQuery);

        $langIDRow = $langIDResult->fetch_assoc();
        $langID = $langIDRow['langID'];

        $topicExistsQuery = "SELECT * FROM topics WHERE topic = '$selectedTopic'";
        $topicExistsResult = $db->query($topicExistsQuery);

        if ($topicExistsResult->num_rows == 0){
            $sql = "INSERT INTO topics(topic, langID) VALUES ('$selectedTopic', $langID)";
            $db->query($sql);
        }
        break;

    case "Get_Lang":
        $sql = "SELECT language FROM languages";
        $result = $db->query($sql);

        if ($result) {
            $languages = $result->fetch_all();
            header('Content-Type: application/json');
            echo json_encode($languages);
        } else {
            http_response_code(500);
            echo "Database error: " . $db->error;
        }
        break;


    case "":
        http_response_code(400);
        echo "Bad request. Language parameter";
        break;
}

http_response_code(200);