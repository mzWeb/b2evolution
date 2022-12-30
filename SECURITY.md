# Security Policy


## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 7.2.5   | :white_check_mark: |

## Reporting a Vulnerability

There is an arbitrary file upload vulnerability in b2evolution v7.2.5.
Attackers can use this vulnerability to execute remote commands.

1. conf/_advanced.php -> $admins_can_manipulate_sensitive_files: set to true
<img width="1090" alt="image" src="https://user-images.githubusercontent.com/23633137/210027978-b15b7c78-76aa-47fe-942f-95cc2263de7a.png">

2. After the admin logged in, access  URL http://localhost/index.php/a/extended-post, at "Drag & Drop files to upload here" Uploading php Files
![image](https://user-images.githubusercontent.com/23633137/210029396-24bda11c-729d-4a5a-b4b7-c6f009acbcdc.png)

3. The php file is stored in media/blogs/a/quick-uploads/
![image](https://user-images.githubusercontent.com/23633137/210029502-4ddc36fd-84b7-4278-9750-cb758b56befc.png)
