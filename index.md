#Archlinux 

##Why ArchLinux

###Philosophy

First let me brief you with arch philosophy.Any ubuntu or Linux Mint user might have come across system monitor and all those processes running in them at least one time in their entire period of usage.But none bothered to ask do we really need all these programs. And it is quite surprising to know that ubuntu comes with a lot of software that many of us won't be using. So what is the point of having it installed in the first place. Ubuntu is a good distro for starters , but if you want control over your system and want to make things minimalistic arch is the distro for you.

###Installation
As pointed out earlier the entire installation process is done via a console. At this point the only guide for you is either  'elinks'  browser or your memory.

###Post Installation

This is maybe the difficult part where you have to configure your entire system for your use. A GUI interface a window manager or desktop environment that suits your need and gives you comfort could be installed along with the programs that you might need.

###Who this guide is for ?

When I installed arch linux I just read the arch wiki and only the arch wiki. There is nothing that they miss and the only problem with arch wiki is that if you want to make your system like the one you see on many blogs you have to read through a lot of material and trust me that is a lot to read.But it ultimately pays off but most of these things you don't want if you want to have a quick setup all arranged for you.That is what I provide.

##First Steps

First you have to download the iso file for arch linux latest one is preferred and then 
use the following command to **write  it to your device** of preference , In my case my pendrive which is detected as /dev/sdb . You could run 'lsblk' and find the device that is mounted.

>     dd bs=4M if=/source/file/iso of=/dev/sdb && sync 

Now you have to **make and format a partition** in your system . This is safer and better if you do it via your existing operating system. As an arch linux wannabe you might be having another distro in your PC. So start from there create a new ext4 partition and a swap partition you might be familiar with the size of this . So it is no big deal or you could do it via the bootable you just created. Any way have the partitions ready. I would suggest a minimum size of 5G for arch linux installation . You could format your drive using the command given below. 


>      fdisk /dev/sda

for gpt partition table use cgdisk . This utility is similar to fdisk . Use these utility at your own risk as you could easily corrupt your system . Command is more or less the same.  
>      cgdisk /dev/sda

Add a new partition and format it using mkfs.
>      mkfs.ext4 /dev/sda1

if you plan to install arch in sda1 . Now make a swap partition as it is recommended for most linux distributions. 

  
>      mkswap /dev/sda2
>      swapon /dev/sda2

Now list the partitions using lsblk -f . You could check what you have to done. Now mount the device and now your are in the system .  

>     mount /dev/sda1 /mnt

##Installing the system

Now install the system using the pacstrap script . This will provide a system with minimalistic functionalities

>     pacstrap -i /mnt base

After this you could chroot in the installed system generate and fstab and then get along with the rest of the process . This part I have done in a different way . I will talk about that now. As I have told earlier if you have **another linux system**ne running in your system before you installed arch linux and you would like to keep just run 
>     update-grub 

and your grub will detect arch linux and will show up in the boot options. Generating an fstab is the right method to do it but this is a lot safer. Now you have to configure all your small but important stuff. 

##After Installation
This is the trickiest part there is to in arch linux. First its all a hustle you have to find the correct drivers for video and audio.To start with this you have to install alsamixer alsa-utils 
>      sudo pacman -S alsamixer alsautils

Start up alsamixer and unmute the channel of speaker or headset according to your use.
Video drivers are an important aspect of installation. Most of the latest computer might be having an intel graphics card. So for this your need to install intel video drivers . To support 3D you have to install mesa.
Media codecs could be installed individually but this is a time consuming task. So it is better if you install mplayer. Many media codecs would come along with it. Thus we have a fully functional light distro.

After this you could chroot in the installed system generate and fstab and then get along with the rest of the process . This part I have done in a different way . I will talk about that now. As I have told earlier if you have another linux system running in your system before you installed arch linux and you would like to keep just run 
>     update-grub 

and your grub will detect arch linux and will show up in the boot options. Generating an fstab is the right method to do it but this is a lot safer. Now you have to configure all your small and important stuff. 

##After Installation

To install all utilities that you have to install all the drivers for sound card and video card. For sound you need alsa-utils alsa-mixer and all . For video you need to know what your card is and on most modern system there might be an intel graphics card. Install this using 
>     sudo pacman -S alsa-utils alsa-mixer 

For video cards you need to install your video driver and mesa if you want 3D support 

>     sudo pacman -S intel-driver 

[back to the top ][top]

