#  <a name="archlinux"></a>Archlinux (top)

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

To install all utilities that you have to install all the drivers for sound card and video card. For sound you need alsa-utils alsa-mixer and all . For video you need to know what your card is and on most modern system there might be an intel graphics card. Install this using 
>     sudo pacman -S alsa-utils alsa-mixer 


For video cards you need to install your video driver and mesa if you want 3D support 

>     sudo pacman -S intel-driver 

useradd -m -g users -G wheel,storage,power -s /bin/bash johndoe 
passwd johndoe

pacman -S sudo

pacman -Ss sudo

EDITOR=nano visudo

%wheel ALL=(ALL) ALL

this comees after all this

speaker-test -c 2

sudo pacman -S mesa

sudo pacman -S nvidia lib32-nvidia-utils

sudo pacman -S xf86-input-synaptics

pacman -S xorg-twm xorg-xclock xterm

startx



aFter installing all this you need to customise your system which could be done by the steps given below. Making your customisab;e means installing a desktop environment of your choice and a window manager of your chocie.I personally like window managers and I have used awesome a smy default one. The difference betwween a desktop environment and a window manager si to be understood . A widnwo manager is the one with a minimal utilities and desktop environment comes with default window manger withn it. it is the one that manages the windows. allignemnt and all that stuff. Which wm and which desktop environment you use it clearly up to you. Whatever customisation I am going to mention here is clearly on a console level.

####Customising your prompt. 
When you open up your .bashrc file in homes folder usually after fresh installation it is pretty blank. So to start with customisation there is variable know nas PSI which could customise your console while you startup . All the things that I mentioned are done only through a lot of efforts . So don't get fed up 

sudo pacman -S alsa-utils

I will shown my psi here 

<pre><code>
PS1="\[\033[0;37m\]\342\224\214\342\224\200\$([[ \$? != 0 ]] && echo \"[\[\033[0;31m\]\342\234\227\[\033[0;37m\]]\342\224\200\")[$(if [[ ${EUID} == 0 ]]; then echo '\[\033[0;31m\]\h'; else echo '\[\033[0;33m\]\u\[\033[0;37m\]@\[\033[0;96m\]\h'; fi)\[\033[0;37m\]]\342\224\200[\[\033[0;32m\]\w\[\033[0;37m\]]\n\[\033[0;37m\]\342\224
\224\342\224\200\342\224\200\342\225\274 \[\033[0m\]"
</code></pre>

just copy this to your .bashrc and you will have a prompt like mine. Now for all the extras.
Now you have to start installing various programs that you might need like a music player and a media player. As told earlier media player would be a nice option to install the entire codec set as almost all codecs are available with it. Now to start with all the important things.
I will make a list

1.media codecs

2.java runtime environment 

3.some other tweaks . 

Now to install java adn all the things. given below

You could install any experimental feature you would like to have. And ultimately it is all in your hands. 
Now about graphics driver. Most of  new configurations will be having a hybrid graphics card and all of the time you might find it difficult to configure your graphics . You can configure your kernel for a particular graphics card and use that one only. Most of us won't be using our high performance graphics anyway. So you could add a line to mkinitcpio.conf file in etc and rebuild kernel or install the linux kernel once again with an improved configuration. This is not  a sure thing but it worked for me quite nicely ( FYI I am using nvida and intel as a performance and default graphics drivers . Some might only be having a single driver in that case you can either add the driver module as a kernel part and build it . I have no prior experience with this part. So I strongly suggest and read through arch linux wiki page for your graphics driver. 

####Making it look cool. 
This is where your creativity comes in . You could customize anything you want . And that in my viewpoint the best any distro can offer. So here is how we will start. First of all the window manager that I am using is awesome and all the customisation listed below are for that . As told earlier this a complete to do list on a need to know basis and I will only show you the whats with proper explanation and not the why's. So to start with we will install awesome. Remember I just started startx and I am at that position. So here is how I look but I install awesome here using 
>      sudo pacman -S awesome

As I told earlier awesome is simply elegant and I assume you are not familiar with window managers as a whole. So here are some tips. 

Windows is your default key for almost all things. 
Type windows + p  -application menu 
windows+Enter     -terminal

Now you have to bind all the keys of your computer for your personal use. Normally on starting awesome almost all keys that are needed for a basic usage will be binded and you would find it easier if you already used another window manager like xmonad where you have to start with a not so simple xmonad.hs and build up from that. When I first used awesome the config file was a real difficult thing to start up. After breaking and making a lot of times I learned where to put what and how to not panic. 
First we will customise our panel a little . The panel is somewhat limited in the number of widgets it shows so we could add more widgets by using a extension in awesome known as vicious . Awesome has got lot of extensions and you could find it in vicious , delightful ,beautiful and all. As told earlier this is need to know guide so download vicious extract itand put in the file ***blah n*** . there you will followign lines to add to your rc.lua and then 
>   asldfjlsdfjdsjflsdjf
>     kajfldjads;lffklsdajfd;ljsdakljf
>     lksjkdfl;sdlfjsdklf;jsdfsdjklfjsf

Now bind your printscr key volume keys and all that if your have anyl
Printscreen requires image magick orany key capturing program to be installed. You could instal image magick usign 
>     sudo pacman -S imagemagick

after that 
>      import 98  screenshtot .png 

will give you the proper screen shot and so on. now put it in a scripit and then try to add it to lua.  
Remember while changing lua check each time the config is correct or not you could do this by doing awesome -k . This is not a simple job. lua syntaxes are a little difficult so do as it is shown here or better I have provided [ rc.lua](somewhere) you could use it. If you run into problems . Befor changes and do thins.

>     mv /etc/xdg/awesome/rc.lua /etc/xdg/awesome/rc.lua.backup

This is alwwasy a good way to reocver your older version if you made your new version woorst by making a typo ro so. Thus we have reached the point where our awesome set up is almost complete there are links to this and you could serch for more customised themes and all. one important thing is how to change wallpaper . There is usually a theme file in rc.lua there are three themes by default you could go to the theme file and change the wallpaper to what you want. And it is same with the icons and all. you could change your workspace with icons 
and do other important stuff that could make your desktop look cool. 

Now there is always gnome for the newbies you could install this by 
>     sudo pacman -S gnome-shell

Now there is one important thing that we missed the gdm the login manager  and that would be gdm . Don't forget to install this or else you won't be having a display add 
>      systemctl start gdm 

selection to log on. for eyecandy tweaks and terminal applications  we have cmus nd mplayer , mc and htop  . Some of my screenshots are given below . These are for awesome and there are other for gnome and an experimental one called elementary. elementary is somewhat elegant in its style. So that is it. Wish you good lcuk with your venture. 

[back to the top](#archlinux)
