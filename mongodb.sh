#!/bin/sh
#
#mongod - Startup script for mongod
#
# chkconfig: - 85 15
# description: Mongodb database.
# processname: mongod
# Source function library
 
. /etc/rc.d/init.d/functions
# things from mongod.conf get there by mongod reading it
# OPTIONS
OPTIONS=" --dbpath=/home/proton/data/ --logpath=/home/data/mongodb.log --logappend &"
#mongod
mongod="/home/proton/mongodb/bin/mongod"
lockfile=/var/lock/subsys/mongod
start()
{
 echo -n $"Starting mongod: "
 daemon $mongod $OPTIONS
 RETVAL=$?
 echo
 [ $RETVAL -eq 0 ] && touch $lockfile
}
 
stop()
{
 echo -n $"Stopping mongod: "
 killproc $mongod -QUIT
 RETVAL=$?
 echo
 [ $RETVAL -eq 0 ] && rm -f $lockfile
}
 
restart () {
    stop
    start
}
ulimit -n 12000
RETVAL=0
 
case "$1" in
 start)
  start
  ;;
 stop)
  stop
  ;;
 restart|reload|force-reload)
  restart
  ;;
 condrestart)
  [ -f $lockfile ] && restart || :
  ;;
 status)
  status $mongod
  RETVAL=$?
  ;;
 *)
  echo "Usage: $0 {start|stop|status|restart|reload|force-reload|condrestart}"
  RETVAL=1
esac
exit $RETVAL