require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

desc "Generate blog files"
task :generate do
    Jekyll::Site.new(Jekyll.configuration({
        "source"      => ".",
        "destination" => "_site"
        })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
    tmp = "../tmp"
    system "git add -A"
    system "git commit -a -m '.'"
    system "git push origin master"
    system "mv -f _site/* #{tmp}"
    system "git checkout -B gh-pages"
    system "rm -rf *.* css img js _*"
    system "mv -f #{tmp}/* ."
    message = "Site updated at #{Time.now}"
    system "git add -A"
    system "git commit -a -m \"#{message.shellescape}\""
    system "git push origin gh-pages --force"
    system "git checkout master"
    system "git stash"
    system "rm -rf #{tmp}/*"
    system "echo yolo"
end

task :default => :publish