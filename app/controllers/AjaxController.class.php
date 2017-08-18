<?php

class AjaxController extends Controller {
    public function admin($key, $val) {
        $json = array("code"=>0);
        switch($key) 
        {
        case 'academic_agency':
            switch( $val ) 
            {
            case 'add':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_add', array('institution_code'=>$_POST['institution_code'], 'cname'=>$_POST['cname']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'del':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_del', array('id'=>$_POST['id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'get':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_get');
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_mod', array('id'=>$_POST['id'], 'institution_code'=>$_POST['institution_code'], 'cname'=>$_POST['cname']));
                $json = array("code"=>1, "data"=>$res);
                break;
            } 
            break;
        case 'academic_agency_agent':
            switch( $val ) 
            {
            case 'add':
                $timestamp = time();
                $session = base64_encode(MD5Prefix . $_POST['username'] . '@@@' . $timestamp . '@@@' . $_POST['agency_id']);
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_agent_add', array('agency_id'=>$_POST['agency_id'], 'username'=>$_POST['username'], 'email'=>$_POST['email'], 'userpass'=>$session, 'timestamp'=>$timestamp));
                if (1 == $res['code']) {
                    $url = APP_URL .'/email/activate/'. $timestamp .'/'. $session .'/' . $_POST['username'] . '/' . $_POST['email'];
                    $this->mailer('add', $_POST['username'], $_POST['email'], $url);
                }
                $json = array("code"=>$res['code'], "data"=>$res);
                break;
            case 'del':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_agent_del', array('id'=>$_POST['id'], 'agency_id'=>$_POST['agency_id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'get':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_agent_get');
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $timestamp = time();
                $session = base64_encode(MD5Prefix . $_POST['id'] . '@@@' . $timestamp . '@@@' . $_POST['agency_id']);
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_agent_mod', array('id'=>$_POST['id'], 'agency_id'=>$_POST['agency_id'], 'email'=>$_POST['email'], 'userpass'=>$session, 'timestamp'=>$timestamp));
                $url = APP_URL .'/email/activate/'. $timestamp . '/' . $session .'/'. $res[0]['username'] .'/'. $_POST['email'];
                $this->mailer('mod', $res[0]['username'], $_POST['email'], $url);

                $res = (new AjaxModel)->dbQuery('admin_academic_agency_agent_get');
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'chk':
                $res =  (new AjaxModel)->dbQuery('admin_check_new_user_add',array('username'=>$_POST['username']));
                $json = array('code'=>1,'data'=>$res);
                break;
            } 
            break;
        case 'academic_agency_unlock':
            switch( $val )
            {
            case 'yes':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_unlock_yes', array('agency_id'=> $_POST['agency_id'], 'id'=> $_POST['id'], 'online'=>$_POST['online'], 'offline'=>$_POST['offline']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'no':
                $res = (new AjaxModel)->dbQuery('admin_academic_agency_unlock_no', array('agency_id'=> $_POST['agency_id'], 'id'=> $_POST['id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            } 
            break;
        case 'academic_era':
            switch( $val )
            {
            case 'add':
                $res = (new AjaxModel)->dbQuery('admin_academic_era_add');
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('admin_academic_era_quarter_mod', array('id'=>$_POST['id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'], 'online'=>$_POST['online'], 'offline'=>$_POST['offline']));    
                $json = array("code"=>1, "data"=>$res);
                break;
            }
            break;
        case 'academic_class':
            switch( $val )
            {
            case 'add':
                $res = (new AjaxModel)->dbQuery('admin_academic_class_add');
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'sel':
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('admin_academic_class_mod', array('checks'=>$_POST['checks']));
                $json = array("code"=>1, "data"=>$res);
                break;
            }
            break;
        case 'profile':
            switch( $val )
            {
            case 'add':
                break;
            case 'sel':
                break;
            case 'mod':
                if (isset($_POST['username'])) {
                    $username = str_replace('NTUE', "", $_POST['username']);

                    if (isset($_POST['email'])) {
                        $res = (new AjaxModel)->dbQuery('admin_profile_email_mod', array('username'=>$username, 'email'=>$_POST['email'],'session'=>$_SESSION['admin']['session']));
                    }
                    if (isset($_POST['userpass'])) {
                        $res = (new AjaxModel)->dbQuery('admin_profile_userpass_mod', array('username'=>$username, 'userpass'=>$_POST['userpass'],'session'=>$_SESSION['admin']['session']));
                    }
                    $json = array("code"=>1, "data"=>$res);
                }
                break;
            }
            break;
        case 'message':
            switch($val)
            {
            case 'noReplyMsgQry':
                if (isset($_SESSION['admin'])) {
                    $res = (new AjaxModel)->dbQuery('admin_board_unreply_query');
                    $json = array("code"=>1, "data"=>$res);
                    //$json = array("code"=>1, "data"=>"GOOD");
                }
    
                break;
            case 'replyMsgSave':
                if (isset($_SESSION['admin'])) {
                    $res = (new AjaxModel)->dbQuery('admin_board_save_reply',array('message_id'=>$_POST['msgid'],'admin_id'=>$_SESSION['admin']['id'],'reply_content'=>$_POST['replyContent']));
                    $json = array("code"=>1, "data"=>$res);
                }
                break;
            }
            break;
        } 
        echo json_encode($json);
    } 

    public function agent($key, $val) {
        $json = array("code"=>0);
        switch($key) 
        {
        case 'academic_agency':
            switch( $val ) 
            {
            case 'get':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_get', array('id'=>$_POST['id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_mod', array('id'=>$_POST['id'], 'cname'=>$_POST['cname'], 'zipcode'=>$_POST['zipcode'], 'address'=>$_POST['address'], 'established'=>$_POST['established'], 'approval'=>$_POST['approval'], 'note'=>$_POST['note']));
                $json = array("code"=>1, "data"=>$res, "posts"=>$_POST);
                break;
            }
            break;
        case 'academic_agency_class':
            switch( $val )
            {
            case 'add':
                $country = (isset($_POST['country']))? $_POST['country'] : array();
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_class_add', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'], 'major_code'=>$_POST['major_code'], 'minor_code'=>$_POST['minor_code'], 'cname'=>$_POST['cname'], 'weekly'=>$_POST['weekly'], 'weeks'=>$_POST['weeks'], 'adjust'=>$_POST['adjust'], 'content_code'=>$_POST['content_code'], 'target_code'=>$_POST['target_code'], 'new_people'=>$_POST['new_people'], 'people'=>$_POST['people'], 'hours'=>$_POST['hours'], 'total_hours'=>$_POST['total_hours'], 'revenue'=>$_POST['revenue'], 'subsidy'=>$_POST['subsidy'], 'turnover'=>$_POST['turnover'], 'note'=>$_POST['note'], 'country'=>$country));
                //$json = array("code"=>1, "data"=>$res);
                $json = array("code"=>1, "data"=>$res, 'hours'=>$_POST['hours'], 'total_hours'=>$_POST['total_hours']);
                break;
            case 'del':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_class_del', array('id'=>$_POST['id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'], 'agency_id'=>$_POST['agency_id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'get':
                break;
            case 'done':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_class_done', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'] ));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $country = (isset($_POST['country']))? $_POST['country'] : array();
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_class_mod', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'], 'class_id'=>$_POST['class_id'], 'minor_code'=>$_POST['minor_code'], 'cname'=>$_POST['cname'], 'weekly'=>$_POST['weekly'], 'weeks'=>$_POST['weeks'], 'adjust'=>$_POST['adjust'], 'content_code'=>$_POST['content_code'], 'target_code'=>$_POST['target_code'], 'new_people'=>$_POST['new_people'], 'people'=>$_POST['people'], 'hours'=>$_POST['hours'], 'total_hours'=>$_POST['total_hours'], 'revenue'=>$_POST['revenue'], 'subsidy'=>$_POST['subsidy'], 'turnover'=>$_POST['turnover'], 'note'=>$_POST['note'], 'country'=>$country));
                $json = array("code"=>1, "data"=>$res, 'hours'=>$_POST['hours'], 'total_hours'=>$_POST['total_hours']);
                break;
            }
            break;
        case 'academic_agency_class_country':
            switch( $val )
            {
            case 'add':
                break;
            case 'del':
                break;
            case 'get':
                break;
            case 'mod':
                break;
            }
            break;
        case 'academic_agency_contact':
            switch( $val ) 
            {
            case 'add':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_contact_add', array('agency_id'=>$_POST['agency_id'], 'cname'=>$_POST['cname'], 'title'=>$_POST['title'], 'manager'=>$_POST['manager'], 'staff'=>$_POST['staff'], 'role'=>$_POST['role'], 'area_code'=>$_POST['area_code'], 'phone'=>$_POST['phone'], 'ext'=>$_POST['ext'], 'email'=>$_POST['email'], 'spare_email'=>$_POST['spare_email'], 'primary'=>$_POST['primary']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'del':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_contact_del', array('agency_id'=>$_POST['agency_id'], 'id'=>$_POST['id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'get':
                $res = (new AjaxModel)->dbQuery('agent_cademic_agency_contact', array('id'=>$_POST['id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_contact_mod', array('agency_id'=>$_POST['agency_id'], 'id'=>$_POST['id'], 'cname'=>$_POST['cname'], 'title'=>$_POST['title'], 'manager'=>$_POST['manager'], 'staff'=>$_POST['staff'], 'role'=>$_POST['role'], 'area_code'=>$_POST['area_code'], 'phone'=>$_POST['phone'], 'ext'=>$_POST['ext'], 'email'=>$_POST['email'], 'spare_email'=>$_POST['spare_email'], 'primary'=>$_POST['primary']));
                $json = array("code"=>1, "data"=>$res);
                break;
            }
            break;
        case 'academic_agency_hr':
            switch( $val ) 
            {
            case 'add':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_hr_add', array('agency_id'=>$_POST['agency_id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'get':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_hr', array('agency_id'=>$_POST['agency_id']));
                $json = array("code"=>1, "data"=>$res);
                break;
            case 'mod':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_hr_mod', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'administration'=>$_POST['administration'], 'subject'=>$_POST['subject'], 'adjunct'=>$_POST['adjunct'], 'reserve'=>$_POST['reserve'], 'others'=>$_POST['others'], 'note'=>$_POST['note']));
                $json = array("code"=>1, "data"=>$res);
                break;
            }
            break;
        case 'academic_agency_report':
            /* academic_agency_report_quarter */
            /* 0:1~4, 1:1, 2:2, 3:3, 4:4, 5:1~2, 6:2~3, 7:3~4, 8:1~3, 9:2~4 */
            $res = array();
            $res['summary'] = (new AjaxModel)->dbQuery('agent_academic_agency_report_summary', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter']));
            $res['detail'] = (new AjaxModel)->dbQuery('agent_academic_agency_report_detail', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter']));
            $res['pdf'] = (new AjaxModel)->dbQuery('agent_academic_agency_report_pdf', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter']));
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'academic_agency_unlock':
            switch( $val ) 
            {
            case 'mod':
                $res = (new AjaxModel)->dbQuery('agent_academic_agency_unlock', array('agency_id'=>$_POST['agency_id'], 'era_id'=>$_POST['era_id'], 'quarter'=>$_POST['quarter'], 'note'=>$_POST['note'], 'work_days'=>$_POST['work_days'], 'minors'=>$_POST['minors']));
                $json = array("code"=>1, "data"=>$res);
                break;
            }
            break;
        case 'profile':
            switch( $val )
            {
            case 'mod':
                if (isset($_POST['username'])) {
                    $username = str_replace('NTUE', "", $_POST['username']);

                    if (isset($_POST['email'])) {
                        $res = (new AjaxModel)->dbQuery('agent_profile_email_mod', array('agency_id'=>$_POST['agency_id'], 'username'=>$username, 'email'=>$_POST['email']));
                    }
                    if (isset($_POST['userpass'])) {
                        $res = (new AjaxModel)->dbQuery('agent_profile_userpass_mod', array('agency_id'=>$_POST['agency_id'], 'username'=>$username, 'userpass'=>$_POST['userpass']));
                    }
                    $json = array("code"=>1, "data"=>$res);
                }
                break;
            }
            break;
        case 'message':
            switch( $val )
            {
            case 'histMsgQry':
                if (isset($_SESSION['agent'])) {
                    $res = (new AjaxModel)->dbQuery('agent_board_reply_query', array('agent_id'=>$_SESSION['agent']['id']));
                    $json = array("code"=>1, "data"=>$res);

                }
                break;
            case 'quesSave':
                if (isset($_SESSION['agent'])) {
                    $res = (new AjaxModel)->dbQuery('agent_board_question_add', array('agent_id'=>$_SESSION['agent']['id'],'question_content'=>$_POST['questionContent']));
                    $json = array("code"=>1, "data"=>$res);
                }
    
                break;
            }
            break;
        }
        echo json_encode($json);
    }

    public function uploads($key, $val) {
        $json = array("code"=>0);
        switch($key) 
        {
        case 'academic_agency_class_country':
            $json['post'] = $_POST;    
            $json['mojo'] = $val;
            break;
        }
        echo json_encode($json);
    }

    public function refs($key, $val) {
        $json = array("code"=>0);
        switch($key) 
        {
        case 'academic_institution':
            $res = (new AjaxModel)->dbQuery('refs_academic_institution');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'academic_agency':
            $res = (new AjaxModel)->dbQuery('refs_academic_agency');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'area_list':
            $res = (new AjaxModel)->dbQuery('refs_area_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'content_list':
            $res = (new AjaxModel)->dbQuery('refs_content_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'country_list':
            $res = (new AjaxModel)->dbQuery('refs_country_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'major_list':
            $res = (new AjaxModel)->dbQuery('refs_major_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'minor_list':
            $res = (new AjaxModel)->dbQuery('refs_minor_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        case 'target_list':
            $res = (new AjaxModel)->dbQuery('refs_target_list');
            $json = array("code"=>1, "data"=>$res);
            break;
        }        
        echo json_encode($json);
    }

    public function mailer($type, $username, $email, $url) {
        $official = (new AjaxModel)->dbQuery('mailer_official_get')[0];

        if ($official) {
            switch($type)
            {
            case 'add':
                $subject = $official['subject_agent_add'];
                $message = str_ireplace("@@@url@@@", $url, str_ireplace("@@@username@@@", $username, $official['message_agent_add']));
                break;
            case 'mod':
                $subject = $official['subject_agent_mod'];
                $message = str_ireplace("@@@url@@@", $url, str_ireplace("@@@username@@@", $username, $official['message_agent_mod']));
                break;
            }
            $headers = 'From: '. $official['cname'] . '<' . $official['email_from'] . "> \r\n".
                       'Reply-To: '. $official['email_reply'] . "\r\n".
                       'X-Mailer: PHP/' . phpversion();
        } else {
            $subject = '華語文教育機構績效系統通知信';
            $message = '您好，您在華語文教育機構招生填報系統的使用者帳號為['. $username .']，請透過以下連結網址設定登入密碼：['. $url .']';
            $from = 'wenyu0421@tea.ntue.edu.tw';

            $headers = 'From: 許文諭<' . $from . "> \r\n".
            'Reply-To: ' . $from . " \r\n".
            'X-Mailer: PHP/'. phpversion();
        }
        mail( $email, $subject, $message, $headers );
    }
}
