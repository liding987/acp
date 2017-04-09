#!/usr/bin/perl -w

use strict;
use warnings;
use POSIX qw(strftime);
use Text::CSV;
use Getopt::Long;
use Pod::Usage;
use DBI;

#################
# Process Input #
#################
my $user;
my $weight;
my $opt_help;
my $opt_man;

GetOptions(
    "user=s"     => \$user,     # string
    'help'       => \$opt_help,
    'man'        => \$opt_man,
) or pod2usage( "Try '$0 --help' for more information." );

pod2usage( -verbose => 1 ) if $opt_help;
pod2usage( -verbose => 2 ) if $opt_man;

unless( defined $user ) {
    pod2usage( "Try perl $0 -u <user name>" );
}

##########################
# Check Output Directory #
##########################
my $dir = '../tmp';

if( !( -e $dir and -d $dir ) )
{
    unless( mkdir $dir ) {
        die "Unable to create $dir\n";
    }
}

my $user_dir = "../tmp/$user";

if( !( -e $user_dir and -d $user_dir ) )
{
    unless( mkdir $user_dir ) {
        die "Unable to create $user_dir\n";
    }
}

#######################
# Connect to Database #
#######################
my $database = 'acp';
my $hostname = 'localhost';
my $port     = '';
my $username = 'root';
my $password = '6462093221';

my $dsn = "DBI:mysql:database=$database;host=$hostname;port=$port";
my $dbh = DBI->connect($dsn, $username, $password);

####################
# Create File Name #
####################
my $timestamp  = strftime("%Y-%m-%d_%H-%M-%S", localtime );
my $basename   = 'results_report';
my $file_name  = "${user}_${basename}_${timestamp}";
my $file       = "$dir/$user/$file_name.csv";

###############
# Process CSV #
###############
my $old_file;
my $fh;
my @rows;
my $csv = Text::CSV->new ( { binary => 1 } )  # should set binary attribute.
                or die "Cannot use CSV: ".Text::CSV->error_diag ();

my $row;
$row->[0] = 'Created';
$row->[1] = 'Address';
$row->[2] = 'City';
$row->[3] = 'State';
$row->[4] = 'Country';
$row->[5] = 'Postal_code';
$row->[6] = 'Radius (Meter)';
$row->[7] = 'Price';
$row->[8] = 'Detail';
$row->[9] = 'Gas Station';
$row->[10] = 'Bank';
$row->[11] = 'Supermarket';
$row->[12] = 'Restaurant';
$row->[13] = 'Rating';
$row->[14] = 'Latitude';
$row->[15] = 'Longitude';
push @rows, $row;

my $query = <<"END_SQL";
    select created,
           address,
           city,
           state,
           country,
           postal_code,
           radius,
           price,
           link,
           num_gas,
           num_bank,
           num_supermarket,
           num_restaurant,
           rating,
           lat,
           lng
      from tb_result
     where user_id = ?
END_SQL

my $sth = $dbh->prepare($query) or die "prepare statement failed: $dbh->errstr()";
$sth->bind_param(1, $user);
$sth->execute() or die "execution failed: $dbh->errstr()";

while (my $ref = $sth->fetchrow_hashref()) {
    # insert new row
    my $row;
    $row->[0] = $ref->{'created'};
    $row->[1] = $ref->{'address'};
    $row->[2] = $ref->{'city'};
    $row->[3] = $ref->{'state'};
    $row->[4] = $ref->{'country'};
    $row->[5] = $ref->{'postal_code'};
    $row->[6] = $ref->{'radius'};
    $row->[7] = $ref->{'price'};
    $row->[8] = $ref->{'link'};
    $row->[9] = $ref->{'num_gas'};
    $row->[10] = $ref->{'num_bank'};
    $row->[11] = $ref->{'num_supermarket'};
    $row->[12] = $ref->{'num_restaurant'};
    $row->[13] = $ref->{'rating'};
    $row->[14] = $ref->{'lat'};
    $row->[15] = $ref->{'lng'};
    push @rows, $row;
}
$sth->finish;

$csv->eol( "\r\n" );

open $fh, ">:encoding(utf8)", "$file" or die "$file: $!";
$csv->print( $fh, $_ ) for @rows;
close $fh or die "$file: $!";

print $file;

=head1 EXAMPLES
  The following is an example of this script:
 generate_results_report.pl -u user_id
=cut

=head1 OPTIONS
=over 8
=item B<-u> or B<-user>
User name
=item B<--help>
Show the brief help information.
=item B<--man>
Read the manual, with examples.
=back
=cut
